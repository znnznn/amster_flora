import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const t = await getTranslations({
        locale: params?.locale,
        namespace: 'Metadata.Checkout'
    })

    return {
        title: t('title')
    }
}

const CheckoutPage = () => {
    return <div>CheckoutPage</div>
}

export default CheckoutPage
