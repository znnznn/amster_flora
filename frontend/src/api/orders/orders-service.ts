import { api } from '../api'
import type { ApiResponse } from '../api.types'

import type { Order, OrderPayload } from './orders.types'

export const ordersService = {
    async get() {
        const { data } = await api.get<ApiResponse<Order>>('/orders')
        return data
    },

    async create(payload: OrderPayload) {
        const { data } = await api.post<Order>('/orders/', payload)
        return data
    },

    async update(id: string, payload: OrderPayload) {
        const { data } = await api.patch<Order>(`/orders/${id}/`, payload)
        return data
    },

    async delete(id: string) {
        await api.delete(`/orders/${id}/`)
        return true
    }
}
