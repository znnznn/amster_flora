import type { ApiResponse } from '../api.types'

import { apiClient } from './../client'
import type { Order, OrderPayload, OrderQueryParams } from './orders-types'

export const ordersService = {
    async get(params: OrderQueryParams) {
        const { data } = await apiClient.get<ApiResponse<Order>>('/orders', {
            params
        })
        return data
    },

    async create(payload: OrderPayload) {
        const { data } = await apiClient.post<Order>('/orders/', payload)
        return data
    },

    async update(id: string, payload: OrderPayload) {
        const { data } = await apiClient.patch<Order>(`/orders/${id}/`, payload)
        return data
    },

    async delete(id: string) {
        await apiClient.delete(`/orders/${id}/`)
        return true
    }
}
