import type { Product } from '@/api/products/products.types'
import { products } from '@/components/catalogue'
import { ProductCard } from '@/components/product-card'

interface ProductsProps {
    products: Product[]
}

export const Products = ({}: ProductsProps) => {
    return (
        <ul className='grid grid-cols-4 gap-4 max-[1240px]:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2'>
            {products.map((product) => (
                <li key={product.id}>
                    <ProductCard product={product} />
                </li>
            ))}
        </ul>
    )
}
