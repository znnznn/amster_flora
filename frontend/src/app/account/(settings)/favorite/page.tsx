import { ProductsList } from '@/app/catalogue/components/products-list'
import { products } from '@/components/catalogue'
import { ScrollArea } from '@/components/ui/scroll-area'

const FavoritePage = () => {
    return (
        <section className='container mt-8 lg:mt-0 lg:pl-0'>
            <ScrollArea className='h-[700px]'>
                <ProductsList products={products} />
            </ScrollArea>
        </section>
    )
}

export default FavoritePage
