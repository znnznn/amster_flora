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

export const editVariant = async (id: number, payload: Partial<AddVariantPayload>) => {
    const response = await api.patch<Variant>(`/variants/${id}/`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}

export const deleteVariant = async (id: number) => {
    const response = await api.delete<Variant>(`/variants/${id}/`)

    return response.data
}
