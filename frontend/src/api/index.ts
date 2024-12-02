import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = 'https://api.amster.org.ua'

export const api = axios.create({
    baseURL: API_URL
})
export const publicApi = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

const refreshToken = async () => {
    const refreshToken = Cookies.get('refreshToken')
    if (!refreshToken) {
        throw new Error('Немає токена оновлення')
    }

    try {
        const response = await api.post(`${API_URL}/auth/token/refresh/`, {
            refresh: refreshToken
        })
        const { access } = response.data
        Cookies.set('accessToken', access)
        return access
    } catch (error) {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        throw error
    }
}

const setAuthToken = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const newToken = await refreshToken()
                setAuthToken(newToken)

                originalRequest.headers.Authorization = `Bearer ${newToken}`

                return api(originalRequest)
            } catch (refreshError) {
                Cookies.remove('accessToken')
                Cookies.remove('refreshToken')
                window.location.href = '/'

                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)
