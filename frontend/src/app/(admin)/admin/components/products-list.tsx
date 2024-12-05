import { AdminProductCard } from './product-card'
import type { Product } from '@/api/products/products.types'
import { cn } from '@/lib/utils'

interface ProductsProps {
    products: Product[]
    className?: string
}
export const AdminProductsList = ({ products, className }: ProductsProps) => {
    if (products.length === 0) {
        return <div className='mt-6 text-lg font-semibold'>Квітів не знайдено!</div>
    }

    return (
        <ul
            className={cn(
                'grid grid-cols-4 gap-4 max-[1240px]:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2',
                className
            )}>
            {products.map((product) => (
                <li key={product.id}>
                    <AdminProductCard product={product} />
                </li>
            ))}
        </ul>
    )
}
