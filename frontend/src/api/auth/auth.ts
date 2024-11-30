import { publicApi } from '..'

import type { LoginCredentials, LoginResponse, RegisterData } from './auth.types'

export const googleAuth = async (token: string): Promise<LoginResponse> => {
    const response = await publicApi.post('/auth/google/', {
        token
    })

    return response.data
}

export const facebookAuth = async (token: string): Promise<LoginResponse> => {
    const response = await publicApi.post('/auth/facebook/', {
        token
    })

    return response.data
}

export const credintialsLogin = async ({
    phone,
    password
}: LoginCredentials): Promise<LoginResponse> => {
    const response = await publicApi.post('/auth/token/', {
        phone,
        password
    })

    return response.data
}

export const register = async (payload: RegisterData): Promise<LoginResponse> => {
    const response = await publicApi.post('/users/', payload)

    return response.data
}
