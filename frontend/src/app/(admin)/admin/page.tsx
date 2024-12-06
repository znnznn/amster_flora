import { AddProduct } from './components/actions/add-product'
import { AddVariant } from './components/actions/add-variant'
import { CategoryFilter } from './components/filters/category'
import { FlowerFilter } from './components/filters/flower'
import { SizeFilter } from './components/filters/size'
import { AdminProductsList } from './components/products-list'
import { products } from '@/components/catalogue'
import { Badge } from '@/components/ui/badge'

export const metadata = {
    title: 'Admin | Amster'
}

const AdminPage = () => {
    return (
        <section className='mt-6 space-y-4'>
            <div className='flex items-center justify-between gap-x-10 gap-y-4 max-md:flex-col'>
                <h1 className='flex items-center gap-x-2 text-2xl font-semibold max-md:text-lg'>
                    Букети <Badge className='pointer-events-none'>14</Badge>
                </h1>
                <AddProduct />
                <AddVariant />
            </div>
            <div className='flex items-center gap-x-4'>
                <CategoryFilter />
                <SizeFilter />
                <FlowerFilter />
            </div>

            <AdminProductsList products={products} />
        </section>
    )
}

export default AdminPage
