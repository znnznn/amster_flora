import { apiClient } from '../client'

import type { CategoriesQueryParams, Category } from './categories-types'

export const categoriesService = {
    async getAll(params: Partial<CategoriesQueryParams>) {
        const { data } = await apiClient.get<Category[]>('/categories/all/', {
            params
        })
        return data
    }
}
