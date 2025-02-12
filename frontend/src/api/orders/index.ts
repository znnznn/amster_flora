import { useTranslations } from 'next-intl'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'sonner'

import { ordersService } from './orders-service'
import type { OrderPayload } from './orders-types'

export const ORDERS_QUERY_KEY = ['orders'] as const

export const useOrders = () => {
    const queryClient = useQueryClient()

    const t = useTranslations('Common')

    // Query for fetching orders
    const ordersQuery = useQuery({
        queryKey: ORDERS_QUERY_KEY,
        queryFn: () => ordersService.get(),
        onError: (error: Error) => {
            toast.error(t('Errors.Orders.Get.Title'), {
                description: error.message || t('Errors.Orders.Get.Description')
            })
        }
    })

    const createOrderMutation = useMutation({
        mutationFn: (payload: OrderPayload) => ordersService.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY })
            // toast.success(t('Success.Orders.Create.Title'), {
            //     description: t('Success.Orders.Create.Description')
            // })
        },
        onError: (error: Error) => {
            toast.error(t('Errors.Orders.Create.Title'), {
                description: error.message || t('Errors.Orders.Create.Description')
            })
        }
    })

    // Mutation for updating an order
    const updateOrderMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: OrderPayload }) =>
            ordersService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY })
            // toast.success(t('Success.Orders.Update.Title'), {
            //     description: t('Success.Orders.Update.Description')
            // })
        },
        onError: (error: Error) => {
            toast.error(t('Errors.Orders.Update.Title'), {
                description: error.message || t('Errors.Orders.Update.Description')
            })
        }
    })

    // Mutation for deleting an order
    const deleteOrderMutation = useMutation({
        mutationFn: (id: string) => ordersService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY })
            // toast.success(t('Success.Orders.Delete.Title'), {
            //     description: t('Success.Orders.Delete.Description')
            // })
        },
        onError: (error: Error) => {
            toast.error(t('Errors.Orders.Delete.Title'), {
                description: error.message || t('Errors.Orders.Delete.Description')
            })
        }
    })

    return {
        ordersQuery,
        createOrderMutation,
        updateOrderMutation,
        deleteOrderMutation
    }
}
