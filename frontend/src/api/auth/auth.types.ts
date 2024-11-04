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
