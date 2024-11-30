import { api } from '@/api';
import type { LoginCredentials, LoginResponse } from '@/api/auth/auth.types';
import type { User } from '@/api/users/users.types';
import { defaultLoginRedirect } from '@/config/routes';
import Cookies from 'js-cookie';

export const credentialsLogin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/token/', credentials);
    const { access, refresh, user } = response.data;

    Cookies.set('access_token', access);
    Cookies.set('refresh_token', refresh);

    Cookies.set('user', JSON.stringify(user));

    return response.data;
};

export const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('user');
    window.location.href = defaultLoginRedirect;
};

export const isAuthenticated = (): boolean => {
    return !!Cookies.get('access_token');
};

export const getCurrentUser = (): User | null => {
    const userStr = Cookies.get('user');

    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
};
