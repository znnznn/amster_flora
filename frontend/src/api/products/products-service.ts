import type { ApiResponse } from '../api.types'
import { apiClient } from '../client'

import type { Product, ProductPayload, ProductsQueryParams } from './products-types'

export const productsService = {
    async get(params: ProductsQueryParams) {
        const { data } = await apiClient.get<ApiResponse<Product>>('/products', {
            params
        })
        return data
    },

    async create(payload: ProductPayload) {
        const { data } = await apiClient.post<Product>('/products/', payload)
        return data
    },

    async update(id: string, payload: ProductPayload) {
        const { data } = await apiClient.patch<Product>(`/products${id}/`, payload)
        return data
    },

    async delete(id: string) {
        await apiClient.delete(`/products${id}/`)
        return true
    }
}
