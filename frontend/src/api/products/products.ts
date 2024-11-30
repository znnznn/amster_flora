import { api } from '..'

import type { AddProductPayload, Product, ProductResponse } from './products.types'

export const getProducts = async () => {
    const response = await api.get<ProductResponse>('/products')

    return response.data
}

export const addProduct = async (payload: AddProductPayload) => {
    const response = await api.post<Product>('/products', payload)

    return response.data
}

export const removeProduct = async (id: number) => {
    const response = await api.delete<Product>(`/products/${id}`)

    return response.data
}
