export type UserRoles = 'client' | 'admin'

export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    phone_number: any
    role: UserRoles
    is_active: boolean
    last_login: any
}
