import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'

import { clientApi } from '../api/client'

import type { AuthResponse, LoginCredentials, Token } from '@/api/auth/auth-types'
import { clientCookies } from '@/api/auth/client-auth-storage'
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_LOGOUT_REDIRECT } from '@/config/routes'

export const useAuth = () => {
    const router = useRouter()

    const { mutateAsync: loginMutation } = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const { data } = await clientApi.post<AuthResponse>(
                '/auth/token/',
                credentials
            )
            return data
        },
        onSuccess: (data) => {
            clientCookies.setTokens({ access: data.access, refresh: data.refresh })
            clientCookies.setUser(data.user)
            router.refresh()
            router.push(DEFAULT_LOGIN_REDIRECT)
        }
    })

    const { mutateAsync: googleLoginMutation } = useMutation({
        mutationFn: async (token: Token) => {
            const { data } = await clientApi.post<AuthResponse>('/auth/google/', token)
            return data
        },
        onSuccess: (data) => {
            clientCookies.setTokens({ access: data.access, refresh: data.refresh })
            clientCookies.setUser(data.user)
            router.refresh()
            router.push(DEFAULT_LOGIN_REDIRECT)
        }
    })

    const user = clientCookies.getUser()
    const { access } = clientCookies.getTokens()

    return {
        user,
        isAuthenticated: !!access,
        login: loginMutation,
        googleLogin: googleLoginMutation,
        logout: () => {
            clientCookies.clearAll()
            router.refresh()
            router.push(DEFAULT_LOGOUT_REDIRECT)
        }
    }
}
