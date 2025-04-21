import type { ApiResponse } from '../api.types'
import { clientApi } from '../client'

import type { Cart, CartPayload, CartsQueryParams } from './carts-types'

export const cartsService = {
    async get(params: CartsQueryParams) {
        const { data } = await clientApi.get<ApiResponse<Cart>>('/carts/', {
            params
        })
        return data
    },

    async create(payload: CartPayload) {
        const { data } = await clientApi.post<Cart>('/carts/', payload)
        return data
    },

    async update(id: number, payload: CartPayload) {
        const { data } = await clientApi.patch<Cart>(`/carts/${id}/`, payload)
        return data
    },

    async delete(id: number) {
        await clientApi.delete(`/carts/${id}/delete/`)
        return true
    }
}
