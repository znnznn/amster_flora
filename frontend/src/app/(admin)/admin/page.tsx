import { AddProduct } from './components/actions/add-product'
import { CategoryFilter } from './components/filters/category'
import { FlowerFilter } from './components/filters/flower'
import { SizeFilter } from './components/filters/size'
import { AdminProductsList } from './components/products-list'
import { defaultLimit, defaultOffset } from '@/api/config/api'
import { getProducts } from '@/api/products/products'
import type { ProductQueryParams } from '@/api/products/products.types'
import { Badge } from '@/components/ui/badge'

export const metadata = {
    title: 'Admin | Amster'
}
interface CatalogueProps {
    searchParams: ProductQueryParams
}

const AdminPage = async ({ searchParams }: CatalogueProps) => {
    const products = await getProducts({
        size: searchParams.size,
        ordering: searchParams.ordering,
        offset: searchParams.offset || defaultOffset,
        limit: searchParams.limit || defaultLimit
    })

    return (
        <section className='mt-6 space-y-4'>
            <div className='flex items-center justify-between gap-x-10 gap-y-4 max-md:flex-col'>
                <h1 className='flex items-center gap-x-2 text-2xl font-semibold max-md:text-lg'>
                    Букети <Badge className='pointer-events-none'>14</Badge>
                </h1>
                <AddProduct />
            </div>
            <div className='flex items-center gap-x-4'>
                <CategoryFilter />
                <SizeFilter />
                <FlowerFilter />
            </div>

            <AdminProductsList initialProducts={products.results || []} />
        </section>
    )
}

export default AdminPage
