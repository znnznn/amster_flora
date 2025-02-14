import type { PaginationParams } from '../api.types'

export interface Category {
    id: number
    name: string
    parent: number
    children: string[]
}

export interface CategoriesQueryParams extends PaginationParams {}
