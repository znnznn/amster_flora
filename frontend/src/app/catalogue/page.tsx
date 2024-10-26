import { Suspense } from 'react'

import { ActiveFilters } from './components/active-filters'
import { FiltersSidebar } from './components/filters-sidebar'
import { Products } from './components/products'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const CataloguePage = () => {
    return (
        <section className='mt-12 max-sm:mt-8'>
            <Breadcrumb className='px-20 max-md:px-16 max-sm:px-6'>
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
            <h1 className='mt-4 text-center text-[28px] font-semibold'>Букети</h1>

            <div className='mt-8 flex items-start gap-x-5 pr-20'>
                <Suspense fallback={<div>Loading...</div>}>
                    <FiltersSidebar />
                </Suspense>
                <div className='flex flex-col gap-y-6'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ActiveFilters />
                    </Suspense>
                    <Products />
                </div>
            </div>
        </section>
    )
}

export default CataloguePage
