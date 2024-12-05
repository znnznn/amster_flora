import { cookies } from 'next/headers'

import { ProductsList } from '@/app/(client)/catalogue/components/products-list'
import { products } from '@/components/catalogue'
import { ProductListPagination } from '@/components/product-list-pagination'

const WatchedPage = () => {
    const watchedProductsIds = cookies().get('watchedProducts')?.value

    const watchedProducts = products.filter((product) =>
        watchedProductsIds?.includes(product.id.toString())
    )

    return (
        <section className='container mt-8 lg:mt-0 lg:pl-0'>
            <ProductsList products={watchedProducts} />
            <ProductListPagination
                className='mt-12'
                count={80}
            />
        </section>
    )
}

export default WatchedPage
