'use server'

import { cookies } from 'next/headers'

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/config/app'

// Read tokens (can be used anywhere on the server)
export async function getTokens() {
    const cookieStore = await cookies()
    return {
        access: cookieStore.get(ACCESS_TOKEN_KEY)?.value,
        refresh: cookieStore.get(REFRESH_TOKEN_KEY)?.value
    }
}

// Set tokens (only in server actions or route handlers)
export async function setTokens({
    access,
    refresh
}: {
    access: string
    refresh: string
}) {
    const cookieStore = await cookies()
    cookieStore.set(ACCESS_TOKEN_KEY, access, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60
    })
    cookieStore.set(REFRESH_TOKEN_KEY, refresh, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7
    })
}

// Clear tokens (only in server actions or route handlers)
export async function clearTokens() {
    // const cookieStore = await cookies()
    // cookieStore.delete(ACCESS_TOKEN_KEY)
    // cookieStore.delete(REFRESH_TOKEN_KEY)
}
