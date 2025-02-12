import { useTranslations } from 'next-intl'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'sonner'

import { ordersService } from './orders-service'
import type { OrderPayload, OrderQueryParams } from './orders-types'

export const ORDERS_QUERY_KEY = ['orders'] as const

interface UseOrdersProps {
    params: OrderQueryParams
}
export const useOrders = ({ params }: UseOrdersProps) => {
    const queryClient = useQueryClient()

    const t = useTranslations('Common')

    const ordersQuery = useQuery({
        queryKey: [ORDERS_QUERY_KEY, params],
        queryFn: () => ordersService.get(params),
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
        },
        onError: (error: Error) => {
            toast.error(t('Errors.Orders.Create.Title'), {
                description: error.message || t('Errors.Orders.Create.Description')
            })
        }
    })

    const updateOrderMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: OrderPayload }) =>
            ordersService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY })
        },
        onError: (error: Error) => {
            toast.error(t('Errors.Orders.Update.Title'), {
                description: error.message || t('Errors.Orders.Update.Description')
            })
        }
    })

    const deleteOrderMutation = useMutation({
        mutationFn: (id: string) => ordersService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY })
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
