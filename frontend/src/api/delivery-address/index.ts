import { useMutation, useQuery, useQueryClient } from 'react-query'

import { deliveryAddressService } from './delivery-address-service'
import type {
    DeliveryAddress,
    DeliveryAddressQueryParams
} from './delivery-address-types'

export const DELIVERYADRESS_QUERY_KEY = ['user'] as const

export const useGetDeliveryAdress = (
    params: DeliveryAddressQueryParams,
    options = {}
) => {
    return useQuery({
        queryKey: [DELIVERYADRESS_QUERY_KEY, params],
        queryFn: () => deliveryAddressService.getAll(params),
        ...options
    })
}

export const useCreateUser = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: DeliveryAddress) => deliveryAddressService.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: DELIVERYADRESS_QUERY_KEY })
        },
        ...options
    })
}

export const useUpdateUser = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: DeliveryAddress }) =>
            deliveryAddressService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: DELIVERYADRESS_QUERY_KEY })
        },
        ...options
    })
}

export const useDeleteUser = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => deliveryAddressService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: DELIVERYADRESS_QUERY_KEY })
        },
        ...options
    })
}
