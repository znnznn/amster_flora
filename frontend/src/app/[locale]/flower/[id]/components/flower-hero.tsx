import { getTranslations } from 'next-intl/server'
import { Fragment } from 'react'

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

interface FlowerHeroProps {
    flower: Product
}
export const FlowerHero = async ({ flower }: FlowerHeroProps) => {
    const t = await getTranslations('Common.Breadcrumb')

    return (
        <Section className='lg:mt-16'>
            <div className='relative flex gap-6 max-md:flex-col max-md:items-center md:justify-between'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>{t('home')}</BreadcrumbLink>
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
