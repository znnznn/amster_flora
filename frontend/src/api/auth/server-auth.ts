import type { AuthResponse, RefreshToken } from '@/api/auth/auth-types'
import { BASE_URL } from '@/config/api'

export async function refreshToken(
    payload: RefreshToken,
    cookieHeader?: string
): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(cookieHeader ? { Cookie: cookieHeader } : {})
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        throw new Error('Failed to refresh token')
    }

    return response.json()
}
