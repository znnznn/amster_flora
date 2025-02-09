import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const t = await getTranslations({
        locale: params?.locale,
        namespace: 'Metadata.Story'
    })

    return {
        title: t('title')
    }
}

const StoryPage = () => {
    return <div>DeliveryPage</div>
}

export default StoryPage
