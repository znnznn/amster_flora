import { api } from '..'

import type { AddCartItemPayload, CartItemsResponse } from './cart.types'

export const getCartItems = async () => {
    const response = await api.get<CartItemsResponse>('/carts/')

    return response.data
}

export const addCartItem = async (payload: AddCartItemPayload) => {
    const response = await api.post('/carts/', payload)

    return response.data
}
