import { cookies } from 'next/headers'

import { ProductsList } from '@/app/catalogue/components/products-list'
import { products } from '@/components/catalogue'
import { ScrollArea } from '@/components/ui/scroll-area'

const WatchedPage = () => {
    const watchedProductsIds = cookies().get('watchedProducts')?.value

    const watchedProducts = products.filter((product) =>
        watchedProductsIds?.includes(product.id.toString())
    )

    return (
        <section className='container mt-8 lg:mt-0 lg:pl-0'>
            <ScrollArea className='h-[700px]'>
                <ProductsList products={watchedProducts} />
            </ScrollArea>
        </section>
    )
}

export default WatchedPage
