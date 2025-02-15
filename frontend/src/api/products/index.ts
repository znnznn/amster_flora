import { useQuery } from 'react-query'

import type { CategoriesQueryParams } from '../categories/categories-types'

import { productsService } from './products-service'

export const PRODUCT_QUERY_KEY = ['product'] as const

export const useProducts = (params: Partial<CategoriesQueryParams>) => {
    // const queryClient = useQueryClient()

    const productsQuery = useQuery({
        queryKey: [PRODUCT_QUERY_KEY, params],
        queryFn: () => productsService.get(params)

        // onError: (error: Error) => {
        //     // toast.error(t('Errors.Product.Get.Title'), {
        //     //     description: error.message || t('Errors.Product.Get.Description')
        //     // })
        // }
    })

    return {
        productsQuery
    }
}
