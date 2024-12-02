import type { Response } from '../index.types'

export interface Category {
    id: number
    name: string
    parent: number
    children: string[]
}

export interface AddCategoryPayload {
    name: string
    parent: number
}

export type CategoriesResponse = Response<Category>
