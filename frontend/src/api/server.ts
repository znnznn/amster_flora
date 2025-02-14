import { serverCookies } from './auth/server-auth-storage'
import { BASE_URL } from '@/config/api'

interface ApiError extends Error {
    status?: number
    data?: any
}

interface Tokens {
    access?: string
}

export const createServerApi = () => {
    const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
        try {
            const tokens: Tokens = await serverCookies.getTokens()

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
        } catch (error) {
            if (error instanceof Error) {
                console.error(`API Error (${endpoint}):`, {
                    message: error.message,
                    status: (error as ApiError).status,
                    data: (error as ApiError).data
                })
            }
            throw error
        }
    }

    return {
        get: (endpoint: string) => fetchWithAuth(endpoint)
        // post: (endpoint: string, data: any) =>
        //     fetchWithAuth(endpoint, {
        //         method: 'POST',
        //         body: JSON.stringify(data)
        //     }),
        // put: (endpoint: string, data: any) =>
        //     fetchWithAuth(endpoint, {
        //         method: 'PUT',
        //         body: JSON.stringify(data)
        //     }),
        // delete: (endpoint: string) =>
        //     fetchWithAuth(endpoint, {
        //         method: 'DELETE'
        //     })
    }
}

export const serverApi = createServerApi()
