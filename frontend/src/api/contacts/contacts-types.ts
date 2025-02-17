import type { PaginationParams } from '../api.types'

export interface Contact {
    id: number
    name: string
    email: string
    phone_number?: string
    text: string
    contacted: boolean
    created_at: string
}

export type ContactPayload = Omit<Contact, 'id' | 'created_at'>

export interface ContactsQueryParams extends PaginationParams {}
