import { useTranslations } from 'next-intl'
import Image from 'next/image'

import chrysanthemums from '@/assets/images/categories/chrysanthemums.jpeg'
import flowerpot from '@/assets/images/categories/flowerpot.jpeg'
import orchid from '@/assets/images/categories/orchid.jpeg'
import peony from '@/assets/images/categories/peony.jpeg'
import rose from '@/assets/images/categories/rose.jpeg'
import tulpin from '@/assets/images/categories/tulpin.jpeg'
import { Section } from '@/components/ui/section'
import { H2 } from '@/components/ui/typography'

export const Categories = () => {
    const t = useTranslations('HomePage')

    return (
        <Section>
            <H2 className='sr-only'> {t('categories.title')}</H2>
            <div className='grid h-[748px] grid-cols-7 grid-rows-8 gap-5'>
                <div className='group relative col-span-3 row-span-4 size-full cursor-pointer overflow-hidden rounded-3xl bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-2xl font-semibold text-accent'>
                        {t('categories.roses')}
                    </h3>
                    <Image
                        src={rose}
                        alt={t('categories.roses')}
                        className='size-full origin-top-left object-cover object-[50%,12%] transition-transform duration-500 group-hover:scale-110'
                    />
                </div>{' '}
                <div className='group relative col-span-2 col-start-4 row-span-3 size-full cursor-pointer overflow-hidden rounded-3xl bg-accent'>
                    <h3 className='absolute right-5 top-5 z-10 text-2xl font-semibold text-primary'>
                        {t('categories.tulips')}
                    </h3>
                    <Image
                        src={tulpin}
                        alt={t('categories.tulips')}
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>{' '}
                <div className='group relative col-span-2 col-start-6 row-span-5 size-full cursor-pointer overflow-hidden rounded-3xl bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-2xl font-semibold text-accent'>
                        {t('categories.chrysanthemums')}
                    </h3>
                    <Image
                        src={chrysanthemums}
                        alt={t('categories.chrysanthemums')}
                        className='size-full origin-top-left object-cover object-top transition-transform duration-500 group-hover:scale-110'
                    />
                </div>{' '}
                <div className='group relative col-span-2 row-span-4 row-start-5 size-full cursor-pointer overflow-hidden rounded-3xl bg-accent'>
                    <h3 className='absolute right-5 top-5 z-10 text-2xl font-semibold text-primary'>
                        {t('categories.flowerpots')}
                    </h3>
                    <Image
                        src={flowerpot}
                        alt={t('categories.flowerpots')}
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='orchid-l group relative col-span-3 col-start-3 row-span-4 row-start-5 size-full cursor-pointer overflow-hidden rounded-3xl bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-2xl font-semibold text-accent'>
                        {t('categories.orchids')}
                    </h3>
                    <Image
                        src={orchid}
                        alt={t('categories.orchids')}
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative col-span-2 col-start-6 row-span-3 row-start-6 size-full cursor-pointer overflow-hidden rounded-3xl bg-accent'>
                    <h3 className='absolute right-5 top-5 z-10 text-2xl font-semibold text-primary'>
                        {t('categories.peony')}
                    </h3>
                    <Image
                        src={peony}
                        alt={t('categories.peony')}
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
            </div>
        </Section>
    )
}
