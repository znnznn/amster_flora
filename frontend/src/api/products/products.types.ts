import type { BaseQueryParams, Response } from '../index.types'
import type { Variant, VariantSize } from '../variants/variants.types'

export interface Product {
    id: number
    name: string
    sku: string
    description: string
    category: number
    shop: number
    variants: Variant[]
    in_wish_list: boolean
    in_cart: boolean
}

export type SingleVariantProduct = Omit<Product, 'variants'> & {
    variant: Variant
}

export interface AddProductPayload {
    name: string
    sku: string
    description: string
    category: number
    shop: number
    variants: Variant[]
}

export type ProductResponse = Response<Product>

export interface ProductQueryParams extends BaseQueryParams {
    size: VariantSize
    ordering: string
    availability: string | boolean
}
