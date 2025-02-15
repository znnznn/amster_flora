import axios from 'axios'

import { clientCookies } from './auth/client-auth-storage'
import { BASE_URL } from '@/config/api'

// Create custom error type
class AuthError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'AuthError'
    }
}

export const clientApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

clientApi.interceptors.request.use((config) => {
    const { access } = clientCookies.getTokens()
    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})

let isRefreshing = false
let failedQueue: Array<{
    resolve: (value: unknown) => void
    reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

clientApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (originalRequest?.url === '/auth/token/refresh/') {
            return Promise.reject(error)
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                        return clientApi(originalRequest)
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const { refresh } = clientCookies.getTokens()

                if (!refresh) {
                    throw new AuthError('No refresh token')
                }

                const response = await axios.post(`${BASE_URL}'/auth/token/refresh/`, {
                    refresh
                })
                const { access, refresh: newRefresh } = response.data

                if (!access || !newRefresh) {
                    throw new AuthError('Invalid refresh response')
                }

                clientCookies.setTokens({ access, refresh: newRefresh })
                processQueue(null, access)
                originalRequest.headers.Authorization = `Bearer ${access}`

                return clientApi(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError, null)
                clientCookies.clearAll()
                throw new AuthError('Authentication failed')
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)
