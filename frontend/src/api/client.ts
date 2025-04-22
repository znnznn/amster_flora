import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from 'axios'
import Cookies from 'js-cookie'

import { authService } from './auth/auth-service'
import { BASE_URL } from '@/config/api'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/config/app'

interface RefreshTokenResponse {
    access: string
    refresh: string
}

type RefreshSubscriberCallback = (token: string) => void

export const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const onLogout = () => {
    // Cookies.remove(ACCESS_TOKEN_KEY)
    // Cookies.remove(REFRESH_TOKEN_KEY)
}

let isRefreshing = false
let refreshSubscribers: RefreshSubscriberCallback[] = []

const subscribeTokenRefresh = (callback: RefreshSubscriberCallback): void => {
    refreshSubscribers.push(callback)
}

const onRefreshed = (token: string): void => {
    refreshSubscribers.forEach((callback) => callback(token))
    refreshSubscribers = []
}

export const setupInterceptors = (): (() => void) => {
    const requestInterceptor = apiClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = Cookies.get(ACCESS_TOKEN_KEY)
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error: any) => Promise.reject(error)
    )

    const responseInterceptor = apiClient.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => response,
        async (error: any) => {
            const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
                error.config

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                if (isRefreshing) {
                    return new Promise<AxiosResponse>((resolve) => {
                        subscribeTokenRefresh((token: string) => {
                            if (originalRequest.headers) {
                                originalRequest.headers.Authorization = `Bearer ${token}`
                            } else {
                                originalRequest.headers = {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                            resolve(apiClient(originalRequest))
                        })
                    })
                }

                isRefreshing = true

                try {
                    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)

                    if (!refreshToken) {
                        onLogout()
                        isRefreshing = false
                        return Promise.reject(error)
                    }

                    const data: RefreshTokenResponse = await authService.refreshToken({
                        refresh: refreshToken
                    })

                    Cookies.set(ACCESS_TOKEN_KEY, data.access, {
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax'
                    })
                    Cookies.set(REFRESH_TOKEN_KEY, data.refresh, {
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax'
                    })

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${data.access}`
                    } else {
                        originalRequest.headers = {
                            Authorization: `Bearer ${data.access}`
                        }
                    }

                    onRefreshed(data.access)
                    isRefreshing = false

                    return apiClient(originalRequest)
                } catch (refreshError) {
                    onLogout()
                    isRefreshing = false
                    refreshSubscribers = []
                    return Promise.reject(refreshError)
                }
            }

            return Promise.reject(error)
        }
    )

    return () => {
        apiClient.interceptors.request.eject(requestInterceptor)
        apiClient.interceptors.response.eject(responseInterceptor)
    }
}

setupInterceptors()
