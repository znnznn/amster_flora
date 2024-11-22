import Link from 'next/link'

import { CartProduct } from './components/cart-product'
import { Catalogue } from '@/components/catalogue'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

const CartPage = () => {
    return (
        <>
            <section className='mt-12 px-20 max-lg:px-16 max-md:px-10 max-sm:mt-8 max-sm:px-3'>
                <Breadcrumb>
                    <BreadcrumbList className='max-sm:justify-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Головна</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Кошик</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className='mt-4 text-center text-[28px] font-semibold max-md:text-lg'>
                    Кошик
                </h1>

                <ul className='mx-auto mt-12 max-w-4xl space-y-5'>
                    <li>
                        <CartProduct />
                    </li>
                    <li>
                        <CartProduct />
                    </li>
                </ul>

                <div className='mt-12 flex flex-col items-center gap-y-4'>
                    <Button
                        size='sm'
                        variant='ghost'
                        asChild>
                        <Link href='/catalogue'>Продовжити покупки</Link>
                    </Button>
                    <Button
                        size='lg'
                        variant='secondary'
                        asChild>
                        <Link href='/checkout'>Оформити</Link>
                    </Button>
                </div>
            </section>
            <Catalogue
                className='mt-28'
                activeTab='similar'
            />
        </>
    )
}

export default CartPage
