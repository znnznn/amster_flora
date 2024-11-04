import { publicApi } from '..'

import type { CredintialsLoginData, LoginResponse, RegisterData } from './auth.types'

export const googleAuth = async (token: string): Promise<LoginResponse> => {
    const response = await publicApi.post('/auth/google/', {
        token
    })

    return response.data
}

export const credintialsLogin = async ({
    phone,
    password
}: CredintialsLoginData): Promise<LoginResponse> => {
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
