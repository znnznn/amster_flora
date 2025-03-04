'use client'

import { useRouter } from 'next/navigation'
import { type ReactNode, createContext, useContext, useEffect, useState } from 'react'
import {
    type UseMutationResult,
    useMutation,
    useQuery,
    useQueryClient
} from 'react-query'

import type { AuthResponse, LoginCredentials, Token } from '@/api/auth/auth-types'
import { clientCookies } from '@/api/auth/client-auth-storage'
import { clientApi } from '@/api/client'
import type { User, UserPayload } from '@/api/users/user-types'
import { usersService } from '@/api/users/users-service'
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_LOGOUT_REDIRECT } from '@/config/routes'

interface AuthContextType {
    user: User | undefined
    isAuthenticated: boolean
    isLoading: boolean
    login: UseMutationResult<AuthResponse, unknown, LoginCredentials, unknown>
    googleLogin: UseMutationResult<AuthResponse, unknown, Token, unknown>
    signUp: UseMutationResult<User, unknown, UserPayload, unknown>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const auth = useAuth()

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider')
    }
    return context
}

const useAuth = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    const initialTokens = clientCookies.getTokens()
    const initialUser = clientCookies.getUser()
    const [isAuthenticated, setIsAuthenticated] = useState(!!initialTokens.access)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        const { access } = clientCookies.getTokens()
        setIsAuthenticated(!!access)
        setIsInitialized(true)
    }, [])

    const {
        data: user,
        refetch: refetchUser,
        isLoading: isUserLoading
    } = useQuery(
        ['user'],
        async () => {
            const userId = clientCookies.getUser()?.id
            if (!userId) throw new Error('No user ID found')
            return usersService.getUser(userId)
        },

        {
            enabled: isAuthenticated,
            staleTime: 5 * 60 * 1000,
            cacheTime: 5 * 60 * 1000,
            retry: 1,
            initialData: initialUser,
            refetchOnWindowFocus: true,
            onSuccess: (data) => {
                clientCookies.setUser(data)
            }
        }
    )

    const signUpMutation = useMutation({
        mutationFn: async (credentials: UserPayload) => {
            const { data } = await usersService.create(credentials)
            return data
        },
        onSuccess: () => {
            router.refresh()
            router.push(DEFAULT_LOGIN_REDIRECT)
        }
    })

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const { data } = await clientApi.post<AuthResponse>(
                '/auth/token/',
                credentials
            )
            return data
        },
        onSuccess: async (data) => {
            clientCookies.setTokens({ access: data.access, refresh: data.refresh })
            clientCookies.setUser(data.user)
            setIsAuthenticated(true)
            // Update React Query cache with the user data to avoid additional network request
            queryClient.setQueryData(['user'], data.user)
            await refetchUser()
            router.refresh()
            router.push(DEFAULT_LOGIN_REDIRECT)
        }
    })

    const googleLoginMutation = useMutation({
        mutationFn: async (token: Token) => {
            const { data } = await clientApi.post<AuthResponse>('/auth/google/', token)
            return data
        },
        onSuccess: async (data) => {
            clientCookies.setTokens({ access: data.access, refresh: data.refresh })
            clientCookies.setUser(data.user)
            setIsAuthenticated(true)
            // Update React Query cache with the user data to avoid additional network request
            queryClient.setQueryData(['user'], data.user)
            await refetchUser()
            router.refresh()
            router.push(DEFAULT_LOGIN_REDIRECT)
        }
    })

    const logout = () => {
        clientCookies.clearAll()
        router.refresh()
        router.push(DEFAULT_LOGOUT_REDIRECT)
        queryClient.clear()
        setIsAuthenticated(false)
    }

    const isLoading = !isInitialized || (isAuthenticated && isUserLoading)

    return {
        user,
        isAuthenticated,
        isLoading,
        login: loginMutation,
        googleLogin: googleLoginMutation,
        signUp: signUpMutation,
        logout
    }
}
