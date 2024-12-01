import type { Response } from '../index.types'

export interface CartItem {
    id: number
    variant: number
    amount: number
    created_at: string
}

export interface AddCartItemPayload {
    variant: number
    amount: number
}

export type CartItemsResponse = Response<CartItem>
