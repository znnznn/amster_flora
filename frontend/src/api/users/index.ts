import { useMutation, useQuery, useQueryClient } from 'react-query'

import type { UserPayload, UserQueryParams } from './user-types'
import { usersService } from './users-service'

export const USERS_QUERY_KEY = ['users'] as const

export const useGetUsers = (params: UserQueryParams, options = {}) => {
    return useQuery({
        queryKey: [USERS_QUERY_KEY, params],
        queryFn: () => usersService.getAll(params),
        ...options
    })
}

export const useCreateUser = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: UserPayload) => usersService.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
        },
        ...options
    })
}

export const useUpdateUser = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UserPayload }) =>
            usersService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
        },
        ...options
    })
}

export const useDeleteUser = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => usersService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
        },
        ...options
    })
}
