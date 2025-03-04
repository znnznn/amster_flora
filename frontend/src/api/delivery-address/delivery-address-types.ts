import type { PaginationParams } from '../api.types'

export interface DeliveryAddress {
    id: number
    creator: number
    street: string
    city: string
    title: string
    description: string
}

export type DeliveryAddressPayload = Omit<DeliveryAddress, 'id'>

export interface DeliveryAddressQueryParams extends PaginationParams {}
