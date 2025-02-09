import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const t = await getTranslations({
        locale: params?.locale,
        namespace: 'Metadata.Account'
    })

    return {
        title: t('title')
    }
}

const AccountPage = () => {
    return <div>AccountPage</div>
}

export default AccountPage
