import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params

    const t = await getTranslations({
        locale,
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
