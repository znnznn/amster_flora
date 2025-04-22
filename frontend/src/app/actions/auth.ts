'use server'

import { refreshToken } from '@/api/auth/server-auth'
import { setTokens } from '@/api/auth/server-auth-storage'

export async function handleRefresh(refresh: string, cookieHeader?: string) {
    const tokens = await refreshToken({ refresh }, cookieHeader)
    setTokens(tokens)
    return tokens
}
