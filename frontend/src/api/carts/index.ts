import { useQuery } from 'react-query'

import type { CategoriesQueryParams } from '../categories/categories-types'

import { cartsService } from './carts-service'

export const CART_QUERY_KEY = ['cart'] as const

export const useCarts = (params: Partial<CategoriesQueryParams>) => {
    // const queryClient = useQueryClient()

    const cartsQuery = useQuery({
        queryKey: [CART_QUERY_KEY, params],
        queryFn: () => cartsService.get(params)

        // onError: (error: Error) => {
        //     // toast.error(t('Errors.Cart.Get.Title'), {
        //     //     description: error.message || t('Errors.Cart.Get.Description')
        //     // })
        // }
    })

    return {
        cartsQuery
    }
}
