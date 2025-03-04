'use client'

import { getPageHeaderInfo } from '../util/get-page-header-info'

import { PageHeader } from '@/components/page-header'
import { usePathname } from '@/i18n/routing'

export const LayoutPageHeader = () => {
    const pathname = usePathname()

    const pageHeaderInfo = getPageHeaderInfo(pathname)

    return (
        <PageHeader
            breadcrumbKeys={pageHeaderInfo.breadcrumbKeys}
            titleKey={pageHeaderInfo?.titleKey}
        />
    )
}
