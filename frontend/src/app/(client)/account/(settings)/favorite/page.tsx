import { ProductsList } from '@/app/(client)/catalogue/components/products-list'
import { products } from '@/components/catalogue'
import { ProductListPagination } from '@/components/product-list-pagination'

const FavoritePage = () => {
    return (
        <section className='container mt-8 lg:mt-0 lg:pl-0'>
            <ProductsList products={products} />
            <ProductListPagination
                className='mt-12'
                count={80}
            />
        </section>
    )
}

export default FavoritePage
