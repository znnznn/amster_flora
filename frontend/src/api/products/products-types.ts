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
    components: Component[]
}

export interface Image {
    id: number
    image: string
    variant: number
}

export interface Component {
    id: number
    key_crm_product: KeyCrmProduct
    quantity: number
}

export interface KeyCrmProduct {
    id: number
    key_crm_id: number
    name: string
    description: string
    thumbnail_url: string
    sku: string
    price: string
    purchased_price: string
    quantity: number
    currency_code: string
    weight: string
    length: string
    width: string
    height: string
}

export interface ProductPayload {}

export interface ProductsQueryParams {}
