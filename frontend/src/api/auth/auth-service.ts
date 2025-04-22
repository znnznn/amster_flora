import { apiClient } from '../client'

import type { AuthResponse, LoginCredentials, RefreshToken, Token } from './auth-types'

export const authService = {
    async facebookLogin(payload: Token) {
        const { data } = await apiClient.post('/auth/facebook/', payload)
        return data
    },
    async googleLogin(payload: Token) {
        const { data } = await apiClient.post('/auth/google/', payload)
        return data
    },
    async credentilasLogin(payload: LoginCredentials) {
        const { data } = await apiClient.post<AuthResponse>('/auth/token/', payload)
        return data
    },
    async refreshToken(payload: RefreshToken) {
        const { data } = await apiClient.post<AuthResponse>(
            '/auth/token/refresh/',
            payload
        )
        return data
    }
}
