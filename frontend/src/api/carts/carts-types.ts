import type { Variant } from '../products/products-types'

export interface Cart {
    id: number
    variant: CartVariant
    amount: number
    created_at: string
    creator: number
}

export interface CartVariant extends Variant {
    product: {
        id: number
        name: string
        sku: string
        description: string
        category: number
        shop: number
    }
}
export interface CartPayload {
    variant: number
    amount: number
}

export interface CartsQueryParams {}
