import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const t = await getTranslations({
        locale: params?.locale,
        namespace: 'Metadata.Wishlist'
    })

    return {
        title: t('title')
    }
}

const WishlistPage = () => {
    return <div>WishlistPage</div>
}

export default WishlistPage
