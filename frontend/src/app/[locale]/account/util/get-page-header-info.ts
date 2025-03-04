import type { DotNestedKeys } from '../../../../../global'

import type { BreadcrumbItem } from '@/components/page-header'

export interface AccountPageInfo {
    titleKey: DotNestedKeys<IntlMessages>
    breadcrumbKeys: BreadcrumbItem[]
}

export type AccountPageInfoMap = {
    [path: string]: AccountPageInfo
}

export const ACCOUNT_PAGE_INFO: AccountPageInfoMap = {
    '/account/profile': {
        titleKey: 'ProfilePage.title',
        breadcrumbKeys: [{ key: 'profile' }]
    },
    '/account/wish-list': {
        titleKey: 'WishlistPage.title',
        breadcrumbKeys: [{ key: 'wish-list' }]
    },
    '/account/orders': {
        titleKey: 'OrdersPage.title',
        breadcrumbKeys: [{ key: 'orders' }]
    },
    '/account/viewed': {
        titleKey: 'ViewedPage.title',
        breadcrumbKeys: [{ key: 'viewed' }]
    }
}

export const getPageHeaderInfo = (
    route: keyof typeof ACCOUNT_PAGE_INFO
): AccountPageInfo => {
    return ACCOUNT_PAGE_INFO[route]
}
