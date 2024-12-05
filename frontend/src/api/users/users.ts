import { api } from '..'

import type {
    PatchUserPayload,
    User,
    UserResponse,
    UsersQueryParams
} from './users.types'
import { getQueryParamString } from '@/utils/get-query-param-string'

export const getUsers = async (queryParams: UsersQueryParams) => {
    const queryString = getQueryParamString(queryParams)
    const response = await api.get<UserResponse>(`/users/?${queryString}`)

    return response.data
}

export const editUser = async (id: number, payload: PatchUserPayload) => {
    const response = await api.put<User>(`/users/${id}/`, payload)

    return response.data
}
