import { api } from '..'

import type { AddCategoryPayload, CategoriesResponse } from './categories.types'

export const getCategories = async () => {
    const response = await api.get<CategoriesResponse>('/categories/')

    return response.data
}

export const addCategory = async (payload: AddCategoryPayload) => {
    const response = await api.post('/categories/', payload)

    return response.data
}
