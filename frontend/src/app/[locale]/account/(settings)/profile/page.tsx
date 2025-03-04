import { getTranslations } from 'next-intl/server'

import { AddAddress } from './components/add-address'
import { ProfileForm } from './components/profile-form'
import { H2 } from '@/components/ui/typography'
import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params

    const t = await getTranslations({
        locale,
        namespace: 'Metadata.Profile'
    })

    return {
        title: t('title')
    }
}

const ProfilePage = () => {
    return (
        <div className='py-6'>
            <H2>Персональні дані</H2>
            <ProfileForm />
            <AddAddress />
        </div>
    )
}

export default ProfilePage
