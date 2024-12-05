import type { BaseQueryParams, Response } from '../index.types'

export type UserRoles = 'client' | 'admin'

export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    phone_number: any
    role: UserRoles
    is_active: boolean
    last_login: string | null
}

export interface PatchUserPayload {
    email: string
    first_name: string
    last_name: string
    phone_number: string
    role?: UserRoles
}

export type UserResponse = Response<User>

export interface UsersQueryParams extends BaseQueryParams {}
