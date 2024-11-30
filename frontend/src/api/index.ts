import { defaultLoginRedirect } from '@/config/routes';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://api.amster.org.ua';

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const publicApi = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get('refresh_token');
                const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                Cookies.set('access_token', access);

                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            } catch (refreshError) {
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                Cookies.remove('user');
                window.location.href = defaultLoginRedirect
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
