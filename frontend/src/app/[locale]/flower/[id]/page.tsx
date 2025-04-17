import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

import { ACCESS_TOKEN } from '@/api/auth/client-auth-storage'
import type { Product } from '@/api/products/products-types'
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
import { BASE_URL } from '@/config/api'
import type { IdParams } from '@/types/params'

export const generateMetadata = async ({ params }: IdParams) => {
    const { id } = await params

    return {
        title: id
    }
}

const FlowerPage = async ({ params }: IdParams) => {
    const { id } = await params

    const cookiesStore = await cookies()

    const response = await fetch(BASE_URL + `/products/${id}/`, {
        headers: {
            Authorization: `Bearer ${cookiesStore.get(ACCESS_TOKEN)?.value}`
        }
    })

    const flower = (await response.json()) as Product

    const t = await getTranslations()

    return (
        <Section className='lg:mt-16'>
            <div className='relative flex gap-6 max-md:flex-col max-md:items-center md:justify-between'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>
                                {t('Common.Breadcrumb.home')}
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <Fragment>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/catalogue'>Букети</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{flower.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </Fragment>
                    </BreadcrumbList>
                </Breadcrumb>
                <H2 className='md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2'>
                    {flower.name}
                </H2>
            </div>
        </Section>
    )
}

export default FlowerPage
