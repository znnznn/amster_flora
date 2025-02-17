import { getTranslations } from 'next-intl/server'

import { BlogCard } from './components/blog-card'
import { PageHeader } from '@/components/ui/page-header'
import { Section } from '@/components/ui/section'
import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params

    const t = await getTranslations({
        locale,
        namespace: 'Metadata.Blog'
    })

    return {
        title: t('title')
    }
}

const BlogPage = () => {
    return (
        <Section className='!mt-6 max-w-[1050px] lg:!mt-12'>
            <PageHeader
                titleKey='BlogPage.title'
                breadcrumbKeys={[{ key: 'blog' }]}
            />
            <div className='mt-12 space-y-6 md:mt-16 md:space-y-8'>
                <BlogCard blogId={1} />
                <BlogCard blogId={2} />
            </div>
        </Section>
    )
}

export default BlogPage
