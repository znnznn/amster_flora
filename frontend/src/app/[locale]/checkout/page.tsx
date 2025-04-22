import { getTranslations } from 'next-intl/server'
import { Fragment } from 'react'

import { CheckoutInfo } from './components/checkout-info'
import type { ApiResponse } from '@/api/api.types'
import type { Cart } from '@/api/carts/carts-types'
import { serverApi } from '@/api/server'
import { type BreadcrumbItem as BreadcrumbItemType } from '@/components/page-header'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Section } from '@/components/ui/section'
import { H2 } from '@/components/ui/typography'
import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params

    const t = await getTranslations({
        locale,
        namespace: 'Metadata.Checkout'
    })

    return {
        title: t('title')
    }
}

const CheckoutPage = async () => {
    const breadcrumbKeys: BreadcrumbItemType[] = [
        { key: 'catalogue', href: '/catalogue' },
        { key: 'cart', href: '/cart' },
        { key: 'checkout' }
    ]

    const t = await getTranslations('Common')

    const carts = (await serverApi.get('/carts/')) as ApiResponse<Cart>

    return (
        <>
            <Section className='!mt-6 lg:!mt-12'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>
                                {t('Breadcrumb.home')}
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {breadcrumbKeys.map((item, index) => (
                            <Fragment key={item.key}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {index === breadcrumbKeys.length - 1 || !item.href ? (
                                        <BreadcrumbPage>
                                            {t(`Breadcrumb.${item.key}`)}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={item.href}>
                                            {t(`Breadcrumb.${item.key}`)}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
                <H2 className='mt-6 text-center'>{t('Breadcrumb.checkout')}</H2>
            </Section>
            <div className='mt-24 flex items-center justify-between'>
                1
                <CheckoutInfo initialCartResponse={carts} />
            </div>
        </>
    )
}

export default CheckoutPage
