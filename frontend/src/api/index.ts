import axios, {
    AxiosError,
    type AxiosInstance,
    type InternalAxiosRequestConfig
} from 'axios'
import Cookies from 'js-cookie'

import type { AuthTokens } from './auth/auth.types'
import { API_URL } from './config/api'

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

const createApi = (baseURL: string): AxiosInstance => {
    const instance = axios.create({ baseURL })

    instance.interceptors.request.use((config: RetryConfig) => {
        const token = Cookies.get('accessToken')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    })

    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as RetryConfig
            if (
                error.response?.status === 401 &&
                originalRequest &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true
                try {
                    const refreshToken = Cookies.get('refreshToken')
                    if (!refreshToken) throw new Error('Немає токена оновлення')

                    const { data } = await publicApi.post<AuthTokens>(
                        '/auth/token/refresh/',
                        { refresh: refreshToken }
                    )
                    Cookies.set('accessToken', data.access)
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${data.access}`
                    }
                    return instance(originalRequest)
                } catch (refreshError) {
                    Cookies.remove('accessToken')
                    Cookies.remove('refreshToken')
                    return Promise.reject(refreshError)
                }
            }
            return Promise.reject(error)
        }
    )

    return instance
}

export const api = createApi(API_URL)
export const publicApi = axios.create({ baseURL: API_URL })
