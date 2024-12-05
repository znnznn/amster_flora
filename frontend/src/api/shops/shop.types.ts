import type { Response } from '../index.types'

export interface Shop {
    id: number
    name: string
    city: string
    address: string
    phone_number: string
    email: string
}

export type AddShopPayload = Omit<Shop, 'id'>

export type ShopsResponse = Response<Shop>
