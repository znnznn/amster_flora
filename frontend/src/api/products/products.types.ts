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

export interface AddProductPayload {
    name: string
    sku: string
    description: string
    category: number
    shop: number
    variants: Variant[]
  }

  export interface Variant {
    size: string
    height: number
    diameter: number
    hex_color: string
    quantity: number
    price: string
    images: string[]
    components: Component[]
  }

  export interface Component {
    key_crm_product: number
    quantity: number
  }

export type ProductResponse = Response<Product>
