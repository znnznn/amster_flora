import { clientApi } from '../client'

import type { AuthResponse, LoginCredentials, RefreshToken, Token } from './auth-types'

export const authService = {
    async facebookLogin(payload: Token) {
        const { data } = await clientApi.post('/auth/facebook/', payload)
        return data
    },
    async googleLogin(payload: Token) {
        const { data } = await clientApi.post('/auth/google/', payload)
        return data
    },
    async credentilasLogin(payload: LoginCredentials) {
        const { data } = await clientApi.post('/auth/token/', payload)
        return data
    },
    async refreshToken(payload: RefreshToken) {
        const { data } = await clientApi.post<AuthResponse>('/auth/refresh/', payload)
        return data
    }
}
