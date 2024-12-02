import { publicApi } from '..'

import type { LoginCredentials, LoginResponse, RegisterData } from './auth.types'

export const googleAuth = async (token: string): Promise<any> => {
    const response = await publicApi.post('/auth/google/', {
        token
    })

    return response.data
}

export const facebookAuth = async (token: string): Promise<any> => {
    const response = await publicApi.post('/auth/facebook/', {
        token
    })

    return response.data
}

export const credentialsLogin = async ({
    email,
    password
}: LoginCredentials): Promise<LoginResponse> => {
    const response = await publicApi.post('/auth/token/', {
        email,
        password
    })

    return response.data
}

export const register = async (payload: RegisterData): Promise<LoginResponse> => {
    const response = await publicApi.post('/users/', payload)

    return response.data
}
