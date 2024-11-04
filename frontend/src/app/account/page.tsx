import { Account } from './components/account'
import { LogOutButton } from './components/log-out'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const AccountPage = () => {
    return (
        <section className='mt-12 px-20 max-md:px-16 max-sm:mt-8 max-sm:px-6'>
            <div className='flex items-center justify-between gap-x-10'>
                <Breadcrumb>
                    <BreadcrumbList className='max-sm:justify-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Головна</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Мій акаунт</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className='text-center text-[28px] font-semibold'>Мій акаунт</h1>
                <LogOutButton />
            </div>

            <Account />
        </section>
    )
}

export default AccountPage
