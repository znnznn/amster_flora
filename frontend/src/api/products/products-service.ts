import type { ApiResponse } from '../api.types'
import { clientApi } from '../client'

import type { Product, ProductPayload, ProductsQueryParams } from './products-types'

export const productsService = {
    async get(params: ProductsQueryParams) {
        const { data } = await clientApi.get<ApiResponse<Product>>('/products', {
            params
        })
        return data
    },

    async create(payload: ProductPayload) {
        const { data } = await clientApi.post<Product>('/products/', payload)
        return data
    },

    async update(id: string, payload: ProductPayload) {
        const { data } = await clientApi.patch<Product>(`/products${id}/`, payload)
        return data
    },

    async delete(id: string) {
        await clientApi.delete(`/products${id}/`)
        return true
    }
}
