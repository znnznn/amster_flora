import type { BaseQueryParams, Response } from '../index.types'
import type { KeyCrmComponent } from '../key-crm/key-crm.types'

export type VariantSize = 'small' | 'medium' | 'large' | 'extra_large'

export type VariantComponent = {
    id: number
    key_crm_product: KeyCrmComponent
    quantity: number
}
export interface Variant {
    id: number
    size: VariantSize
    height: number
    diameter: number
    hex_color: string
    quantity: string
    price: string
    image: string
    images: Image[]
    components: VariantComponent[]
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
    components: any[]
}

export type VariantsResponse = Response<Variant>

export interface VariantsQueryParams extends BaseQueryParams {}
