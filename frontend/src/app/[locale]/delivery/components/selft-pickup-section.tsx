'use client'

import Image from 'next/image'
import { useState } from 'react'

import weOpen from '@/assets/images/delivery/we-open.jpg'
import { CitySelector } from '@/components/city-selector'
import { MapIframe } from '@/components/map-iframe'
import { ScrollArea } from '@/components/ui/scroll-area'
import { H2 } from '@/components/ui/typography'
import { type CITY_OPTIONS, DEFAULT_CITY } from '@/config/app'
import { Link } from '@/i18n/routing'

export const SelftPickupSection = () => {
    const [city, setCity] = useState<(typeof CITY_OPTIONS)[number]>(DEFAULT_CITY)
    return (
        <>
            <H2 className='mt-16'>Самовивіз</H2>
            <div className='mr-8 mt-10 flex items-start justify-between gap-x-10'>
                <div className='w-1/2'>
                    <CitySelector
                        className='w-full border border-border'
                        city={city}
                        setCity={setCity}
                    />
                    <ScrollArea className='mt-6 h-80 pr-6'>
                        <article>
                            <Image
                                src={weOpen}
                                alt='Ми відкриті'
                                className='h-40 w-full rounded-3xl object-cover'
                            />
                            <div className='mt-6 flex flex-col gap-y-5'>
                                <h1 className='text-lg font-medium'>
                                    вул. Велика Кільцева, 6
                                </h1>
                                <div className='flex items-center justify-between gap-x-5 text-lg text-primary'>
                                    <Link
                                        className='transition-colors hover:text-accent'
                                        href='tel:0500000000'
                                    >
                                        050 000 00 00{' '}
                                    </Link>
                                    <span>Пн-Нд: 08:00-21:00</span>
                                </div>
                                <Link
                                    className='underline transition-colors hover:text-accent'
                                    href='/'
                                >
                                    Прокласти маршрут
                                </Link>
                            </div>
                        </article>
                        <article className='mt-4'>
                            <Image
                                src={weOpen}
                                alt='Ми відкриті'
                                className='h-40 w-full rounded-3xl object-cover'
                            />
                            <div className='mt-6 flex flex-col gap-y-5'>
                                <h1 className='text-lg font-medium'>
                                    вул. Велика Кільцева, 6
                                </h1>
                                <div className='flex items-center justify-between gap-x-5 text-lg text-primary'>
                                    <Link
                                        className='transition-colors hover:text-accent'
                                        href='tel:0500000000'
                                    >
                                        050 000 00 00{' '}
                                    </Link>
                                    <span>Пн-Нд: 08:00-21:00</span>
                                </div>
                                <Link
                                    className='underline transition-colors hover:text-accent'
                                    href='/'
                                >
                                    Прокласти маршрут
                                </Link>
                            </div>
                        </article>
                    </ScrollArea>
                </div>
                <MapIframe className='h-96 w-full' />
            </div>
        </>
    )
}
