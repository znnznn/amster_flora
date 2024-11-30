import { api } from '..'

import type { KeyCrmComponentResponse } from './key-crm.types'

export const getKeyCrmComponents = async () => {
    const response = await api.get<KeyCrmComponentResponse>('/key-crm/products/')

    return response.data
}
