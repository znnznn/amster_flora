import type { User } from '../users/user-types'

export interface Token {
    token: string
}

export interface RefreshToken {
    refresh: string
}

export type AuthTokens = Token & RefreshToken

export interface AuthResponse extends AuthTokens {
    user: User
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface AuthState {
    access: string | null
    refresh: string | null
    user: User | null
}
