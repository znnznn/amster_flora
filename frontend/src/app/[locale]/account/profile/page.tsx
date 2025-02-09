import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const t = await getTranslations({
        locale: params?.locale,
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
