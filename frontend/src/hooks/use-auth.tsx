import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { api } from '@/api'
import { credentialsLogin, facebookAuth, googleAuth } from '@/api/auth/auth'
import type { LoginCredentials } from '@/api/auth/auth.types'
import { defaultLogoutRedirect } from '@/config/routes'

export const useAuth = () => {
    const router = useRouter()

    const [isAuth, setIsAuth] = useState(() => !!Cookies.get('accessToken'))
    const [errorMessage, setErrorMessage] = useState('')
    const queryClient = useQueryClient()

    const { data: user, isLoading: isUserLoading } = useQuery(
        'user',
        async () => {
            const response = await api.get('/users/me/')
            return response.data
        },
        {
            enabled: isAuth,
            onError: () => {
                setIsAuth(false)
                Cookies.remove('accessToken')
                Cookies.remove('refreshToken')
            },
            retry: false
        }
    )

    const handleAuthSuccess = useCallback(
        (data: any) => {
            Cookies.set('accessToken', data.access)
            Cookies.set('refreshToken', data.refresh)
            setIsAuth(true)
            setErrorMessage('')
            router.refresh()
            window.location.reload()
            queryClient.invalidateQueries('user')
        },
        [queryClient, router]
    )

    const handleAuthError = useCallback((error: any) => {
        setErrorMessage(error.response?.data?.detail || 'Помилка автентифікації')
    }, [])

    const loginMutation = useMutation(
        (credentials: LoginCredentials) => credentialsLogin(credentials),
        {
            onSuccess: handleAuthSuccess,
            onError: handleAuthError
        }
    )

    const googleLoginMutation = useMutation(
        (credential: string) => googleAuth(credential),
        {
            onSuccess: handleAuthSuccess,
            onError: handleAuthError
        }
    )

    const facebookLoginMutation = useMutation(
        (accessToken: string) => facebookAuth(accessToken),
        {
            onSuccess: handleAuthSuccess,
            onError: handleAuthError
        }
    )

    const login = useCallback(
        (payload: LoginCredentials) => loginMutation.mutateAsync(payload),
        [loginMutation]
    )

    const googleLogin = useCallback(
        (credential: string) => googleLoginMutation.mutateAsync(credential),
        [googleLoginMutation]
    )

    const facebookLogin = useCallback(
        (accessToken: string) => facebookLoginMutation.mutateAsync(accessToken),
        [facebookLoginMutation]
    )

    const logout = useCallback(() => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        setIsAuth(false)
        setErrorMessage('')
        queryClient.clear()
        router.push(defaultLogoutRedirect)
        router.refresh()
    }, [queryClient, router])

    return {
        isAuth,
        user,
        login,
        googleLogin,
        facebookLogin,
        logout,
        isLoginLoading:
            loginMutation.isLoading ||
            googleLoginMutation.isLoading ||
            facebookLoginMutation.isLoading,
        isUserLoading,
        errorMessage,
        loginError:
            loginMutation.error ||
            googleLoginMutation.error ||
            facebookLoginMutation.error
    }
}
