import { serverCookies } from './auth/server-auth-storage'
import { BASE_URL } from '@/config/api'

export const createServerApi = () => {
    const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
        const tokens = await serverCookies.getTokens()

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: tokens.access ? `Bearer ${tokens.access}` : '',
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('API call failed')
        }

        return response.json()
    }

    return {
        get: (endpoint: string) => fetchWithAuth(endpoint)
    }
}

export const serverApi = createServerApi()
