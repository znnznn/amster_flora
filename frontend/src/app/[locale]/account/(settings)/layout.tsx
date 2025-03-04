import type { PropsWithChildren } from 'react'

import { LayoutPageHeader } from '../components/layout-page-header'
import { AccountSidebar } from '../components/sidebar'

import { Section } from '@/components/ui/section'

const AccountLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Section className='lg:mt-16'>
                <LayoutPageHeader />
            </Section>
            <div className='mt-16 flex items-center gap-x-20'>
                <AccountSidebar />
                <div className='flex-1 max-lg:container lg:pr-20'>{children}</div>
            </div>
        </>
    )
}

export default AccountLayout
