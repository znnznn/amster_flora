import { api } from '..'

import type { CredintialsLoginData, LoginResponse, RegisterData } from './auth.types'

export const googleAuth = async (token: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/google/', {
        token
    })

    return response.data
}

export const credintialsLogin = async ({
    phone,
    password
}: CredintialsLoginData): Promise<LoginResponse> => {
    const response = await api.post('/auth/token/', {
        phone,
        password
    })

    return response.data
}

export const register = async (payload: RegisterData): Promise<LoginResponse> => {
    const response = await api.post('/auth/register/', payload)

    return response.data
}
