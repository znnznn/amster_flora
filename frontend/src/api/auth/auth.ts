import type { CredintialsLoginData, LoginResponse } from './auth.types'

export const googleAuth = async (token: string): Promise<LoginResponse> => {
    const response = await fetch('https://api.amster.org.ua/auth/google/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    })

    return response.json()
}

export const credintialsLogin = async ({
    phone,
    password
}: CredintialsLoginData): Promise<LoginResponse> => {
    const response = await fetch('https://api.amster.org.ua/auth/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone,
            password
        })
    })

    return response.json()
}
