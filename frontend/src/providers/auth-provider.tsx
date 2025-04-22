'use client'

import Cookies from 'js-cookie'
import { type PropsWithChildren, createContext, useContext, useState } from 'react'
import {
    type UseMutationResult,
    useMutation,
    useQuery,
    useQueryClient
} from 'react-query'

import { authService } from '@/api/auth/auth-service'
import type { AuthResponse, LoginCredentials } from '@/api/auth/auth-types'
import type { User } from '@/api/users/user-types'
import { usersService } from '@/api/users/users-service'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/config/app'

interface AuthContextType {
    user: User | null
    isAuth: boolean
    login: ({
        onSuccess
    }: {
        onSuccess?: () => void
    }) => UseMutationResult<AuthResponse, Error, LoginCredentials, unknown>
    logout: () => void
    isUserLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuth, setIsAuth] = useState(() => {
        return !!Cookies.get(ACCESS_TOKEN_KEY)
    })

    const queryClient = useQueryClient()

    const handleLogout = () => {
        Cookies.remove(ACCESS_TOKEN_KEY)
        Cookies.remove(REFRESH_TOKEN_KEY)

        setIsAuth(false)

        queryClient.resetQueries({ queryKey: ['user'] })
    }

    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => usersService.getMe(),
        enabled: isAuth,
        refetchOnWindowFocus: true,
        refetchInterval: 5 * 60 * 1000
    })

    const handleLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
        const loginMutation = useMutation({
            mutationFn: authService.credentilasLogin,
            onSuccess: (data) => {
                Cookies.set(ACCESS_TOKEN_KEY, data.access, {
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                })
                Cookies.set(REFRESH_TOKEN_KEY, data.refresh, {
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                })

                onSuccess?.()

                setIsAuth(true)

                queryClient.invalidateQueries({ queryKey: ['user'] })
            }
        })

        return loginMutation
    }

    const value: AuthContextType = {
        user: user || null,
        isAuth,
        login: handleLogin as any,
        logout: handleLogout,
        isUserLoading: isLoading
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
