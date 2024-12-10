import { api } from '..'

import type {
    AddProductPayload,
    Product,
    ProductQueryParams,
    ProductResponse
} from './products.types'
import { getQueryParamString } from '@/utils/get-query-param-string'

export const getProducts = async (queryParams: Partial<ProductQueryParams>) => {
    const queryString = getQueryParamString(queryParams)
    const response = await api.get<ProductResponse>('/products/?' + queryString)

    return response.data
}

export const getProduct = async (id: number) => {
    const response = await api.get<Product>(`/products/${id}/`)

    return response.data
}

export const addProduct = async (payload: AddProductPayload) => {
    const response = await api.post<Product>('/products/', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}

export const editProduct = async (id: number, payload: Partial<AddProductPayload>) => {
    const response = await api.patch<Product>(`/products/${id}/`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}

export const removeProduct = async (id: number) => {
    const response = await api.delete<Product>(`/products/${id}/`)

    return response.data
}
