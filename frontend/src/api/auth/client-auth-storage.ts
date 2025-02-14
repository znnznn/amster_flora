import { deleteCookie, getCookie, setCookie } from 'cookies-next/client'

import type { User } from '../users/user-types'

import type { AuthTokens } from './auth-types'

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'
export const USER_DATA = 'user'

export const clientCookies = {
    setTokens: (tokens: AuthTokens) => {
        setCookie(ACCESS_TOKEN, tokens.access, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 15 // 15 minutes for access token
        })
        setCookie(REFRESH_TOKEN, tokens.refresh, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 1 week for refresh token
        })
    },
    setUser: (user: User) => {
        setCookie(USER_DATA, JSON.stringify(user), {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        })
    },
    getTokens: () => ({
        access: getCookie(ACCESS_TOKEN) as string,
        refresh: getCookie(REFRESH_TOKEN) as string
    }),
    getUser: () => {
        const userData = getCookie(USER_DATA)
        return userData ? JSON?.parse(userData as string) : null
    },
    clearAll: () => {
        deleteCookie(ACCESS_TOKEN)
        deleteCookie(REFRESH_TOKEN)
        deleteCookie(USER_DATA)
    }
}
