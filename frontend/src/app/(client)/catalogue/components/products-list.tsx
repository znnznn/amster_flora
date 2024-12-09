'use client'

import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { defaultLimit, defaultOffset } from '@/api/config/api'
import { getProducts } from '@/api/products/products'
import type { Product, SingleVariantProduct } from '@/api/products/products.types'
import { ProductCard } from '@/components/product-card'

interface ProductsProps {
    initialProducts: Product[]
}

export const flattenItem = (item: Product): SingleVariantProduct[] => {
    return item.variants.map((variant) => ({
        id: item.id,
        name: item.name,
        sku: item.sku,
        description: item.description,
        category: item.category,
        shop: item.shop,
        variant: variant,
        in_wish_list: item.in_wish_list,
        in_cart: item.in_cart
    }))
}

export const ProductsList = ({ initialProducts }: ProductsProps) => {
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
                limit: limit
            })
            return products.results
        },
        initialData: initialProducts,
        queryKey: ['products', size, ordering, limit, offset]
    })

    const flattenProducts = products?.flatMap(flattenItem)

    return (
        <ul className='grid grid-cols-4 gap-4 max-[1240px]:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2'>
            {flattenProducts?.map((product) => (
                <li key={product.id}>
                    <ProductCard product={product} />
                </li>
            ))}
        </ul>
    )
}
