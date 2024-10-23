import { ProductCard } from '@/components/product-card'

export const Products = () => {
    return (
        <ul className='grid grid-cols-4 gap-4'>
            {Array.from({ length: 16 }).map((_, index) => (
                <li key={index}>
                    <ProductCard />
                </li>
            ))}
        </ul>
    )
}
