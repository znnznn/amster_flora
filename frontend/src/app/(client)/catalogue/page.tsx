import { Suspense } from 'react'

import { ActiveFilters } from './components/active-filters'
import { FiltersSidebar, MobileFilterSidebar } from './components/filters-sidebar'
import { SortingFilter } from './components/filters/sorting'
import { ProductsList } from './components/products-list'
import { Catalogue } from '@/components/catalogue'
import { ProductListPagination } from '@/components/product-list-pagination'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const CataloguePage = async () => {
    return (
        <>
            <section className='mt-12 max-sm:mt-8'>
                <Breadcrumb className='px-20 max-lg:px-16 max-md:px-10 max-sm:px-3'>
                    <BreadcrumbList className='max-sm:justify-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Головна</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Букети</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className='mt-4 text-center text-2xl font-semibold max-md:text-lg'>
                    Букети
                </h1>

                <div className='mt-8 flex items-start gap-x-5 gap-y-8 pr-16 max-[1240px]:pr-10 max-lg:flex-col max-lg:pl-10 max-sm:px-3'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FiltersSidebar />
                        <div className='flex flex-col gap-y-4 max-sm:w-full lg:hidden'>
                            <MobileFilterSidebar />
                            <SortingFilter />
                        </div>
                    </Suspense>
                    <div className='flex flex-col gap-y-6'>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ActiveFilters />
                        </Suspense>
                        <ProductsList products={[]} />
                        <ProductListPagination count={80} />
                    </div>
                </div>
            </section>
            <Catalogue
                className='mt-28 max-md:mt-16'
                activeTab='promo'
            />
            {/* <DiscountModal /> */}
        </>
    )
}

export default CataloguePage
