import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const t = await getTranslations({
        locale: params?.locale,
        namespace: 'Metadata.Cart'
    })

    return {
        title: t('title')
    }
}

const CartPage = () => {
    return (
        <div className='mt-10 flex h-10 w-10 items-center bg-slate-500'>CheckoutPage</div>
    )
}

export default CartPage
