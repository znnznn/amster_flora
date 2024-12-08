import type { Response } from '../index.types'

export interface FavoritesItem {
    id: number
    variant: number
    amount: number
    created_at: string
}

export interface AddFavoritesItemPayload {
    product: number
}

export type FavoritesItemsResponse = Response<FavoritesItem>
