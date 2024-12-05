import { api } from '..'

import type { AddShopPayload, ShopsResponse } from './shop.types'

export const getShops = async () => {
    const response = await api.get<ShopsResponse>('/shops/')

    return response.data
}

export const addShop = async (payload: AddShopPayload) => {
    const response = await api.post('/shops/', payload)

    return response.data
}
