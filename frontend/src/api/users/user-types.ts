import type { PaginationParams } from '../api.types'

export type Roles = 'admin' | 'client' | 'manager'

export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    phone_number: string
    role: Roles
    is_active: boolean
    last_login: string
}

export type UserPayload = Omit<User, 'id' | 'is_active' | 'last_login'>

export interface UserQueryParams extends PaginationParams {}
