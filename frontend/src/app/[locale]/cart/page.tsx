import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { CartList } from './components/cart-list'
import type { ApiResponse } from '@/api/api.types'
import type { Cart } from '@/api/carts/carts-types'
import { serverApi } from '@/api/server'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params

    const t = await getTranslations({
        locale,
        namespace: 'Metadata.Cart'
    })

    return {
        title: t('title')
    }
}

const CartPage = async () => {
    const carts = (await serverApi.get('/carts/')) as ApiResponse<Cart>

    const t = await getTranslations('CartPage')

    return (
        <>
            <Section className='!mt-6 max-w-[1050px] lg:!mt-12'>
                <PageHeader
                    titleKey='CartPage.title'
                    breadcrumbKeys={[
                        { key: 'catalogue', href: '/catalogue' },
                        { key: 'cart' }
                    ]}
                />
            </Section>
            <Section className='max-w-[900px]'>
                {carts.count > 0 ? (
                    <CartList initialCartResponse={carts} />
                ) : (
                    <div className='flex flex-col items-center justify-center gap-3'>
                        <h2 className='text-center text-xl font-medium'>
                            {t('empty-title')}
                        </h2>
                        <Link href='/catalogue'>
                            <Button
                                variant='accent'
                                size='sm'
                            >
                                {t('to-catalogue')}
                            </Button>
                        </Link>
                    </div>
                )}
                <div className='mt-10 flex flex-col items-center justify-center gap-6'>
                    <Link
                        className='text-center text-sm underline transition-colors hover:text-accent'
                        href='/catalogue'
                    >
                        {t('continue-shopping')}
                    </Link>
                    <Link href='/checkout'>
                        <Button variant='accent'>{t('checkout')}</Button>
                    </Link>
                </div>
            </Section>
        </>
    )
}

export default CartPage
