import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const t = await getTranslations({
        locale: params?.locale,
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
