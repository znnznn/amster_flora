'use client'

import { useTranslations } from 'next-intl'
import { Fragment } from 'react'

import type { DotNestedKeys, Messages } from '../../../global'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { H2 } from '@/components/ui/typography'

interface BreadcrumbItem {
    key: keyof Messages['Common']['Breadcrumb']
    href?: string
}

interface PageHeaderProps {
    titleKey: DotNestedKeys<Messages>
    breadcrumbKeys: BreadcrumbItem[]
}

export const PageHeader = ({ titleKey, breadcrumbKeys }: PageHeaderProps) => {
    const t = useTranslations()

    return (
        <div className='relative flex gap-6 max-md:flex-col max-md:items-center'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>
                            {t('Common.Breadcrumb.home')}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {breadcrumbKeys.map((item, index) => (
                        <Fragment key={item.key}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {index === breadcrumbKeys.length - 1 || !item.href ? (
                                    <BreadcrumbPage>
                                        {t(`Common.Breadcrumb.${item.key}`)}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={item.href}>
                                        {t(`Common.Breadcrumb.${item.key}`)}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>

            <H2 className='md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2'>
                {t(titleKey)}
            </H2>
        </div>
    )
}
