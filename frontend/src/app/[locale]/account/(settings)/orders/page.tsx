import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params

    const t = await getTranslations({
        locale,
        namespace: 'Metadata.Orders'
    })

    return {
        title: t('title')
    }
}

const OrdersPage = () => {
    return <div>OrdersPage</div>
}

export default OrdersPage
