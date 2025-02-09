import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const t = await getTranslations({
        locale: params?.locale,
        namespace: 'Metadata.Blog'
    })

    return {
        title: t('title')
    }
}

const BlogPage = () => {
    return <div>BlogPage</div>
}

export default BlogPage
