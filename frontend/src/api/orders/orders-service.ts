import type { ApiResponse } from '../api.types'

import { clientApi } from './../client'
import type { Order, OrderPayload, OrderQueryParams } from './orders-types'

export const ordersService = {
    async get(params: OrderQueryParams) {
        const { data } = await clientApi.get<ApiResponse<Order>>('/orders', {
            params
        })
        return data
    },

    async create(payload: OrderPayload) {
        const { data } = await clientApi.post<Order>('/orders/', payload)
        return data
    },

    async update(id: string, payload: OrderPayload) {
        const { data } = await clientApi.patch<Order>(`/orders/${id}/`, payload)
        return data
    },

    async delete(id: string) {
        await clientApi.delete(`/orders/${id}/`)
        return true
    }
}
