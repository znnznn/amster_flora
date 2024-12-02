import { api } from '..'

import type { UserResponse, UsersQueryParams } from './users.types'
import { getQueryParamString } from '@/utils/get-query-param-string'

export const getUsers = async (queryParams: UsersQueryParams) => {
    const queryString = getQueryParamString(queryParams)
    const response = await api.get<UserResponse>(`/users/?${queryString}`)

    return response.data
}
