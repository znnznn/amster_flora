import { api } from '..'

import type { AddFavoritesItemPayload, FavoritesItemsResponse } from './favorites.types'

export const getFavoritesItems = async () => {
    const response = await api.get<FavoritesItemsResponse>('/wish-list/')

    return response.data
}

export const addFavoritesItem = async (payload: AddFavoritesItemPayload) => {
    const response = await api.post('/wish-list/', payload)

    return response.data
}
