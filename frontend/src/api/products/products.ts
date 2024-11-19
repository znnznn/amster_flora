import { api } from '..'

import type { ProductResponse } from './productts.types'

export const getProducts = async () => {
    const response = await api.get<ProductResponse>('/products')

    return response
}
