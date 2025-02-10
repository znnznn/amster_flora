import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import story01 from '@/assets/images/story/story_01.jpg'
import story02 from '@/assets/images/story/story_02.jpg'
import story03 from '@/assets/images/story/story_03.jpg'
import story04 from '@/assets/images/story/story_04.jpg'
import { PageHeader } from '@/components/ui/page-header'
import { Section } from '@/components/ui/section'
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
    const t = useTranslations('StoryPage')
    return (
        <Section className='!mt-6 max-w-[1050px] lg:!mt-12'>
            <PageHeader
                titleKey='StoryPage.title'
                breadcrumbKeys={[{ key: 'story' }]}
            />
            <div className='mt-12 space-y-8 md:mt-16 md:space-y-12'>
                <div className='flex items-center gap-x-5 gap-y-3 max-lg:flex-col'>
                    <Image
                        priority
                        className='rounded-5xl h-64 w-full object-cover object-top md:h-[450px] lg:max-w-[500px]'
                        src={story01}
                        alt={t('stories.story-1')}
                    />
                    <p className='leading-snug text-primary md:text-lg'>
                        {t('stories.story-1')}
                    </p>
                </div>
                <div className='flex flex-col items-center gap-x-5 gap-y-3 lg:flex-row-reverse'>
                    <Image
                        className='rounded-5xl h-64 w-full object-cover object-top md:h-[450px] lg:max-w-[500px]'
                        src={story02}
                        alt={t('stories.story-2')}
                    />
                    <p className='leading-snug text-primary md:text-lg'>
                        {t('stories.story-2')}
                    </p>
                </div>
                <div className='flex items-center gap-x-5 gap-y-3 max-lg:flex-col'>
                    <Image
                        className='rounded-5xl h-64 w-full object-cover md:h-[450px] lg:max-w-[500px]'
                        src={story03}
                        alt={t('stories.story-3')}
                    />
                    <p className='leading-snug text-primary md:text-lg'>
                        {t('stories.story-3')}
                    </p>
                </div>
                <div className='flex flex-col items-center gap-x-5 gap-y-3 lg:flex-row-reverse'>
                    <Image
                        className='rounded-5xl h-64 w-full object-cover md:h-[450px] lg:max-w-[500px]'
                        src={story04}
                        alt={t('stories.story-4')}
                    />
                    <p className='leading-snug text-primary md:text-lg'>
                        {t('stories.story-4')}
                    </p>
                </div>
            </div>
        </Section>
    )
}

export default StoryPage
