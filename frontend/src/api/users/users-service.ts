import type { ApiResponse } from '../api.types'
import { clientApi } from '../client'

import type { User, UserPayload, UserQueryParams } from './user-types'

export const usersService = {
    async getUser(userId: string) {
        const { data } = await clientApi.get<ApiResponse<User>>(`/users/${userId}/`)
        return data
    },
    async getAllUsers(params?: Partial<UserQueryParams>) {
        const { data } = await clientApi.get('/users/all/', {
            params
        })
        return data
    },
    async updateUser(id: number, payload: Partial<UserPayload>) {
        const { data } = await clientApi.patch(`/users/${id}/`, payload)
        return data
    },
    async createUser(payload: UserPayload) {
        const { data } = await clientApi.post('/users/', payload)
        return data
    },
    async deleteUser(id: number) {
        await clientApi.delete(`/users/${id}/`)
    }
}
