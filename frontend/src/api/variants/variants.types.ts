import type { BaseQueryParams, Response } from '../index.types'
import type { Component } from '../products/products.types'

export interface Variant {
    id: number
    size: string
    height: number
    diameter: number
    hex_color: string
    quantity: string
    price: string
    image: string
    images: Image[]
}

export interface Image {
    id: number
    image: string
    variant: number
}

export interface AddVariantPayload {
    size: string
    height: number
    diameter: number
    hex_color: string
    quantity: number
    price: string
    images: File[]
    components: Component[]
}

export type VariantsResponse = Response<Variant>

export interface VariantsQueryParams extends BaseQueryParams {}
