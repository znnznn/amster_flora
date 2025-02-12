import { useTranslations } from 'next-intl'
import Image from 'next/image'

import blog01 from '@/assets/images/blog/blog_01.jpg'
import { Link } from '@/i18n/routing'
import { trunc } from '@/utils/text'

interface BlogCardProps {
    blogId: number
}
export const BlogCard = ({ blogId }: BlogCardProps) => {
    const t = useTranslations('BlogPage.BlogCard')

    return (
        <Link
            className='group flex gap-5 rounded-3xl border p-4 transition-colors hover:border-primary max-md:flex-col md:h-[270px] md:p-6'
            href={`/blog/${blogId}/`}
        >
            <div className='shrink-0 max-md:flex max-md:gap-5 md:max-w-60'>
                <Image
                    className='size-full rounded-3xl object-cover max-md:max-w-[150px]'
                    src={blog01}
                    alt='blog01'
                    width={400}
                    height={200}
                />
                <h2 className='max-w-80 text-lg font-semibold text-primary md:hidden'>
                    {t('title')}
                </h2>
            </div>
            <div className='flex size-full flex-col justify-between max-md:hidden'>
                <h2 className='text-lg font-semibold text-primary md:text-xl'>
                    {t('title')}
                </h2>
                <p className='mt-8 max-w-xl'>{trunc(t('description'), 210)}</p>
                <button className='inline-flex items-center gap-2 self-end text-sm text-primary md:text-lg'>
                    <span className='underline'>{t('read')}</span>
                    <svg
                        className='w-6 transition-transform group-hover:translate-x-1.5 md:w-12'
                        viewBox='0 0 50 45'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M9.375 22.5H40.625M40.625 22.5L28.9063 33.75M40.625 22.5L28.9063 11.25'
                            stroke='#002D44'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </button>
            </div>
            <div className='md:hidden'>
                <p className='max-w-xl'>{trunc(t('description'), 150)}</p>
                <button className='ml-auto mt-4 flex items-center gap-2 self-end text-sm text-primary'>
                    <span className='underline'>{t('read')}</span>
                    <svg
                        className='w-6 transition-transform group-hover:translate-x-1.5'
                        viewBox='0 0 50 45'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M9.375 22.5H40.625M40.625 22.5L28.9063 33.75M40.625 22.5L28.9063 11.25'
                            stroke='#002D44'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </button>
            </div>
        </Link>
    )
}
