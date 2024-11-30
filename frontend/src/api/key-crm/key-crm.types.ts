import type { Response } from '../index.types'

export interface KeyCrmComponent {
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


export type KeyCrmComponentResponse = Response<KeyCrmComponent>
