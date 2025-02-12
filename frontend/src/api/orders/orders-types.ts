import type { PaginationParams } from '../api.types'

export interface Order {
    id: number
    status: string
    address: Address
    creator: number
    discount: string
    created_at: string
    orders_items: OrdersItem[]
}

export interface Address {
    id: number
    creator: number
    street: string
    city: string
    title: string
    description: string
}

export interface OrdersItem {
    id: number
    order: number
    variant: Variant
    amount: number
    price: string
    discount: string
    percentage: number
    creator: number
}

export interface Variant {
    id: number
    product: Product
    size: string
    height: number
    diameter: number
    hex_color: string
    quantity: number
    price: string
    image: string
    images: Image[]
    components: number[]
}

export interface Product {
    id: number
    name: string
    sku: string
    description: string
    category: number
    shop: number
}

export interface Image {
    id: number
    image: string
    variant: number
}

export interface OrderPayload {
    address: number
}

export interface OrderQueryParams extends PaginationParams {}
