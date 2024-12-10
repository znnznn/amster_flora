'use client'

import { AdminProductCard } from './product-card'
import type { ProductResponse } from '@/api/products/products.types'

interface ProductsProps {
    initialProductsResponse: ProductResponse
    className?: string
}

export const AdminProductsList = ({ initialProductsResponse }: ProductsProps) => {
    // const [size] = useQueryState('size', { defaultValue: '', shallow: false })
    // const [ordering] = useQueryState('ordering', { defaultValue: '', shallow: false })
    // const [offset] = useQueryState('offset', {
    //     defaultValue: defaultOffset,
    //     shallow: false,
    //     parse: Number
    // })
    // const [limit] = useQueryState('limit', {
    //     defaultValue: defaultLimit,
    //     shallow: false,
    //     parse: Number
    // })

    // const { data: products } = useQuery({
    //     queryFn: async () => {
    //         const products = await getProducts({})
    //         return products
    //     },
    //     initialData: initialProductsResponse,
    //     queryKey: ['products']
    // })

    if (initialProductsResponse?.count === 0) {
        return <div className='mt-6 text-lg font-semibold'>Квітів не знайдено!</div>
    }

    console.log(initialProductsResponse?.results)

    return (
        <ul className='grid grid-cols-4 gap-4 max-[1240px]:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2'>
            {initialProductsResponse?.results?.map((product) => (
                <li key={product.id}>
                    <AdminProductCard product={product} />
                </li>
            ))}
        </ul>
    )
}
