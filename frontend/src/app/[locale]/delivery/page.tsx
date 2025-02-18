import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params

    const t = await getTranslations({
        locale,
        namespace: 'Metadata.Delivery'
    })

    return {
        title: t('title')
    }
}

const DeliveryPage = () => {
    return <div>DeliveryPage</div>
}

export default DeliveryPage
