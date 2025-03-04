import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params

    const t = await getTranslations({
        locale,
        namespace: 'Metadata.Viewed'
    })

    return {
        title: t('title')
    }
}

const ViewedPage = () => {
    return <div>ViewedPage </div>
}

export default ViewedPage
