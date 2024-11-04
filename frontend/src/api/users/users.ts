import { api } from '..'

import type { UserResponse } from './users.types'

export const getUsers = async () => {
    const response = await api.get<UserResponse>('/users')

    return response.data
}
