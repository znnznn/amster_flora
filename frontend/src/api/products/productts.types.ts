import type { Response } from '../index.types'

export interface Product {
    id: number
    name: string
    sku: string
    description: string
    category: number
    shop: number
    variants: string
}

export type ProductResponse = Response<Product>
