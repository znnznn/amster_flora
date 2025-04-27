import type { ApiResponse } from '../api.types'
import { apiClient } from '../client'

import type { Cart, CartPayload, CartsQueryParams } from './carts-types'

export const cartsService = {
    async get(params: CartsQueryParams) {
        const { data } = await apiClient.get<ApiResponse<Cart>>('/carts/', {
            params
        })
        return data
    },
    async create(payload: CartPayload) {
        const { data } = await apiClient.post<Cart>('/carts/', payload)
        return data
    },

    async update(variantId: number, payload: CartPayload) {
        const { data } = await apiClient.patch<Cart>(
            `/carts/${variantId}/update/`,
            payload
        )
        return data
    },

    async delete(id: number) {
        await apiClient.delete(`/carts/${id}/delete/`)
        return true
    }
}
