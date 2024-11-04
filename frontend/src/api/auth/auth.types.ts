import type { User } from '../users/users.types'

export interface LoginResponse {
    refresh: string
    access: string
    user: User
}

export interface CredintialsLoginData {
    phone: string
    password: string
}

export interface RegisterData {
    email: string
    first_name: string
    last_name?: string
    phone_number: string
    role?: string
    password: string
}
