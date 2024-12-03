import type { PropsWithChildren } from 'react'

import { AccountSidebar } from './components/sidebar'
import { LayoutTitle } from './layout-title'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const AccountLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Breadcrumb className='container mt-12 max-sm:mt-8'>
                <BreadcrumbList className='max-sm:justify-center'>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Головна</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/account'>Мій акаунт</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Особистий кабінет</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <LayoutTitle />
            <div className='mt-16 flex items-start gap-x-8 max-lg:mt-0'>
                <AccountSidebar />
                <main className='flex-1 pt-5 max-lg:pt-0'>{children}</main>
            </div>
        </>
    )
}
export default AccountLayout
