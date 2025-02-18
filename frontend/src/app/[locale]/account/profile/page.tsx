import { getTranslations } from 'next-intl/server'

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
    return <div>ProfilePage</div>
}

export default ProfilePage
