import { clientApi } from '../client'

import type {
    DeliveryAddress,
    DeliveryAddressPayload,
    DeliveryAddressQueryParams
} from './delivery-address-types'

export const deliveryAddressService = {
    async getUser(userId: string) {
        const { data } = await clientApi.get<DeliveryAddress>(
            `/delivery-addresses/${userId}/`
        )
        return data
    },
    async getAll(params?: Partial<DeliveryAddressQueryParams>) {
        const { data } = await clientApi.get('/delivery-addresses/all/', {
            params
        })
        return data
    },
    async update(id: number, payload: Partial<DeliveryAddressPayload>) {
        const { data } = await clientApi.patch(`/delivery-addresses/${id}/`, payload)
        return data
    },
    async create(payload: DeliveryAddressPayload) {
        const { data } = await clientApi.post('/delivery-addresses/', payload)
        return data
    },
    async delete(id: number) {
        await clientApi.delete(`/delivery-addresses/${id}/`)
    }
}
