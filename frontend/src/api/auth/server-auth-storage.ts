'use server'

import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from './client-auth-storage'

export const serverCookies = {
    getTokens: async () => {
        const cookieStore = await cookies()
        return {
            access: cookieStore.get(ACCESS_TOKEN)?.value,
            refresh: cookieStore.get(REFRESH_TOKEN)?.value
        }
    },
    getUser: async () => {
        const cookieStore = await cookies()
        const userData = cookieStore.get(USER_DATA)?.value
        return userData ? JSON.parse(userData) : null
    }
}

export const middlewareCookies = {
    getAccessToken: (request: NextRequest) => request.cookies.get(ACCESS_TOKEN)?.value
}
