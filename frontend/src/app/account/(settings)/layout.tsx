import type { PropsWithChildren } from 'react'

import { AccountSidebar } from './components/sidebar'
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
            <div className='mt-12 flex items-center gap-x-14 px-20 max-lg:flex-col max-lg:gap-y-4 max-md:px-16 max-sm:mt-8 max-sm:px-3'>
                <Breadcrumb>
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
                            <BreadcrumbPage>Персональні дані</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className='text-center text-[28px] font-semibold max-md:text-lg'>
                    Персональні дані
                </h1>
            </div>
            <div className='mt-16 flex items-start gap-x-10 max-lg:mt-0'>
                <AccountSidebar />
                <main className='flex-1 pt-5 max-lg:pt-0'>{children}</main>
            </div>
        </>
    )
}
export default AccountLayout
