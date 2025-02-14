import { useQuery } from 'react-query'

import { categoriesService } from './categories-service'
import type { CategoriesQueryParams } from './categories-types'

export const CATEGORY_QUERY_KEY = ['category'] as const

export const useCategory = (params: Partial<CategoriesQueryParams>) => {
    // const queryClient = useQueryClient()

    const categoryQuery = useQuery({
        queryKey: [CATEGORY_QUERY_KEY, params],
        queryFn: () => categoriesService.getAll(params)
        // onError: (error: Error) => {
        //     // toast.error(t('Errors.Category.Get.Title'), {
        //     //     description: error.message || t('Errors.Category.Get.Description')
        //     // })
        // }
    })

    return {
        categoryQuery
    }
}
