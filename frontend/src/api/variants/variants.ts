import { api } from '..'

import type { AddVariantPayload, Variant } from './variants.types'

export const addVariant = async (payload: AddVariantPayload) => {
    const response = await api.post<Variant>('/variants/', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}
