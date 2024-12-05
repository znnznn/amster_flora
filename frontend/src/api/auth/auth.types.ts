import type { User, UserRoles } from '../users/users.types'

export interface LoginResponse {
    refresh: string
    access: string
    user: User
}

export interface LoginCredentials {
    // phone: string
    email: string
    password: string
}

export interface SignUpPayload {
    email: string
    first_name: string
    last_name: string
    phone_number: string
    role?: UserRoles
    password: string
}

export interface AuthTokens {
    access: string
    refresh: string
}
