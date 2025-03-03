import { useTranslations } from 'next-intl'
import Image from 'next/image'

import notFound from '@/assets/images/not-found.png'
import { Link } from '@/i18n/routing'

const NotFound = () => {
    const t = useTranslations('NotFoundPage')
    return (
        <section className='flex flex-col items-center justify-center px-8 py-20'>
            <Image
                priority
                src={notFound}
                alt='Сторінку не знайдено'
            />
            <p className='mt-10 text-lg font-medium text-muted max-md:text-base'>
                {t('title')}{' '}
                <Link
                    className='text-primary'
                    href='/'
                >
                    {t('link')}
                </Link>
            </p>
        </section>
    )
}

export default NotFound
