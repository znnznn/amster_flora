'use client';

import { Link } from "@/i18n/routing";
import Image from "next/image";

import notFound from '@/assets/images/not-found.png';

export default function NotFound() {
    return (
        <html lang="uk">
            <body>
                <section className='flex flex-col items-center justify-center px-8 py-20'>
                    <Image
                        priority
                        src={notFound}
                        alt='Сторінку не знайдено'
                    />
                    <p className='mt-10 text-lg font-medium text-muted max-md:text-base'>
                        Схоже у нас виникли проблеми. Поверніться на{' '}
                        <Link
                            locale='ua'
                            className='text-primary'
                            href='/'>
                            головну сторінку.
                        </Link>
                    </p>
                </section>
            </body>
        </html>
    );
}
