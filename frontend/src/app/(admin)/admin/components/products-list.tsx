'use client'

import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { AdminProductCard } from './product-card'
import { defaultLimit, defaultOffset } from '@/api/config/api'
import { getProducts } from '@/api/products/products'
import type { ProductResponse } from '@/api/products/products.types'
import type { VariantSize } from '@/api/variants/variants.types'

interface ProductsProps {
    initialProductsResponse: ProductResponse
    className?: string
}

export const AdminProductsList = ({ initialProductsResponse }: ProductsProps) => {
    const [size] = useQueryState('size', { defaultValue: '', shallow: false })
    const [ordering] = useQueryState('ordering', { defaultValue: '', shallow: false })
    const [offset] = useQueryState('offset', {
        defaultValue: defaultOffset,
        shallow: false,
        parse: Number
    })
    const [limit] = useQueryState('limit', {
        defaultValue: defaultLimit,
        shallow: false,
        parse: Number
    })

    const { data: products } = useQuery({
        queryFn: async () => {
            const products = await getProducts({
                ordering: ordering,
                offset: offset,
                limit: limit,
                size: size as VariantSize
            })
            return products
        },
        initialData: initialProductsResponse,
        queryKey: ['products']
    })

    if (products?.count === 0) {
        return <div className='mt-6 text-lg font-semibold'>Квітів не знайдено!</div>
    }

    return (
        <ul className='grid grid-cols-4 gap-4 max-[1240px]:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2'>
            {products?.results?.map((product) => (
                <li key={product.id}>
                    <AdminProductCard product={product} />
                </li>
            ))}
        </ul>
    )
}
