import { clientApi } from '../client'

import type { User, UserPayload, UserQueryParams } from './user-types'

export const usersService = {
    async getUser(userId: string) {
        const { data } = await clientApi.get<User>(`/users/${userId}/`)
        return data
    },
    async getAll(params?: Partial<UserQueryParams>) {
        const { data } = await clientApi.get('/users/all/', {
            params
        })
        return data
    },
    async update(id: number, payload: Partial<UserPayload>) {
        const { data } = await clientApi.patch(`/users/${id}/`, payload)
        return data
    },
    async create(payload: UserPayload) {
        const { data } = await clientApi.post('/users/', payload)
        return data
    },
    async delete(id: number) {
        await clientApi.delete(`/users/${id}/`)
    }
}
