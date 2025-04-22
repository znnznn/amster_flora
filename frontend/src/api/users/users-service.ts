import { apiClient } from '../client'

import type { User, UserPayload, UserQueryParams } from './user-types'

export const usersService = {
    async getUser(userId: string) {
        const { data } = await apiClient.get<User>(`/users/${userId}/`)
        return data
    },
    async getMe() {
        const { data } = await apiClient.get<User>('/users/me/')
        return data
    },
    async getAll(params?: Partial<UserQueryParams>) {
        const { data } = await apiClient.get('/users/all/', {
            params
        })
        return data
    },
    async update(id: number, payload: Partial<UserPayload>) {
        const { data } = await apiClient.patch(`/users/${id}/`, payload)
        return data
    },
    async create(payload: UserPayload) {
        const { data } = await apiClient.post('/users/', payload)
        return data
    },
    async delete(id: number) {
        await apiClient.delete(`/users/${id}/`)
    }
}
