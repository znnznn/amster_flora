import type { Variant } from '../products/products-types'

export interface Cart {
    id: number
    variant: Variant
    amount: number
    created_at: string
    creator: number
}

export interface CartPayload {
    variant: number
    amount: number
}

export interface CartsQueryParams {}
