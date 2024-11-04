import Image from 'next/image'
import Link from 'next/link'

import notFound from '@/assets/images/not-found.png'

const NotFound = () => {
    return (
        <section className='flex flex-col items-center justify-center px-8 py-20'>
            <Image
                src={notFound}
                alt='Сторінку не знайдено'
            />
            <p className='mt-10 text-lg font-medium text-muted max-md:text-base'>
                Схоже у нас виникли проблеми. Поверніться на{' '}
                <Link
                    className='text-primary'
                    href='/'>
                    головну сторінку.
                </Link>
            </p>
        </section>
    )
}

export default NotFound
