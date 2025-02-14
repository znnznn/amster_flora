import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'
const USER_DATA = 'user'

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

export function getMiddlewareAccessToken(request: NextRequest) {
    return request.cookies.get(ACCESS_TOKEN)?.value
}
