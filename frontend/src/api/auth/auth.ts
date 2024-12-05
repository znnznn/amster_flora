import { api, publicApi } from '..'

import type { User } from '../users/users.types'

import type { LoginCredentials, LoginResponse, SignUpPayload } from './auth.types'

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

export const signUp = async (payload: SignUpPayload) => {
    const response = await api.post<User>('/users/', payload)

    return response.data
}
