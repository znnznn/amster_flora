import { getTranslations } from 'next-intl/server'

import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params
    const t = await getTranslations({
        locale,
        namespace: 'Metadata.Search'
    })

    return {
        title: t('title')
    }
}

const SearchPage = () => {
    return <div className='mt-10 flex h-10 w-10 items-center'>Search</div>
}

export default SearchPage
