import { getTokens } from './auth/server-auth-storage'
import { handleRefresh } from '@/app/actions/auth'
import { BASE_URL } from '@/config/api'

interface ApiError extends Error {
    status?: number
    data?: any
}

export const createServerApi = () => {
    const fetchWithAuth = async (
        endpoint: string,
        options: RequestInit = {},
        retry = true
    ): Promise<any> => {
        const tokens = await getTokens()

        if (!tokens.access) {
            throw new Error('No access token available')
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${tokens.access}`,
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 401 && retry && tokens.refresh) {
            const newTokens = await handleRefresh(tokens.refresh)

            return {
                __refresh__: true,
                newTokens,
                endpoint,
                options
            }
        }

        if (!response.ok) {
            const error = new Error('API call failed') as ApiError
            error.status = response.status
            try {
                error.data = await response.json()
            } catch {
                error.data = await response.text()
            }
            throw error
        }

        return response.json()
    }

    return {
        get: (endpoint: string) => fetchWithAuth(endpoint),
        post: (endpoint: string, data: any) =>
            fetchWithAuth(endpoint, {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        put: (endpoint: string, data: any) =>
            fetchWithAuth(endpoint, {
                method: 'PUT',
                body: JSON.stringify(data)
            }),
        delete: (endpoint: string) =>
            fetchWithAuth(endpoint, {
                method: 'DELETE'
            })
    }
}

export const serverApi = createServerApi()
