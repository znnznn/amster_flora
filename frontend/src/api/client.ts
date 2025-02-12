import axios from 'axios'

import { clientCookies } from './auth/client-auth-storage'
import { BASE_URL } from '@/config/api'

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

// Response interceptor for token refresh
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
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

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const token = await new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject })
                    })
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return clientApi(originalRequest)
                } catch (err) {
                    return Promise.reject(err)
                }
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const { refresh } = clientCookies.getTokens()
                if (!refresh) throw new Error('No refresh token')

                const response = await clientApi.post('/auth/refresh/', { refresh })
                const { access, refresh: newRefresh } = response.data

                clientCookies.setTokens({ token: access, refresh: newRefresh })
                processQueue(null, access)
                originalRequest.headers.Authorization = `Bearer ${access}`

                return clientApi(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError, null)
                clientCookies.clearAll()
                window.location.href = '/login'
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)
