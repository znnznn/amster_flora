import Image from 'next/image'
import Link from 'next/link'

import { CitySelect } from './city-select'
import flower from '@/assets/images/flower.jpg'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export const SelfDelivery = () => {
    return (
        <div className='mt-12 max-sm:mt-8'>
            <h2 className='text-2xl font-semibold max-md:text-lg'>Самовивіз</h2>

            <div className='mt-10 flex items-start justify-between gap-10 max-lg:gap-6 max-md:flex-col'>
                <div className='w-1/2 max-md:mx-auto max-md:w-2/3 max-sm:w-full'>
                    <CitySelect />
                    <ScrollArea className='h-80 pr-4 pt-4 max-md:h-[300px]'>
                        <article className='max-md:flex max-md:items-start max-md:gap-x-4'>
                            <Image
                                src={flower}
                                alt='Півоній'
                                className='h-44 w-full rounded-3xl object-cover'
                            />
                            <div className='mt-6 flex flex-col gap-y-5 py-1 max-md:mt-0 max-md:min-h-full max-md:justify-between'>
                                <h1 className='text-lg font-medium max-lg:text-base'>
                                    вул. Велика Кільцева, 6
                                </h1>
                                <div className='flex items-center justify-between gap-x-5 gap-y-3 text-lg text-muted max-lg:text-base max-md:flex-col max-md:items-start'>
                                    <Link
                                        className='transition-colors hover:text-accent'
                                        href='tel:0500000000'>
                                        050 000 00 00{' '}
                                    </Link>
                                    <span>Пн-Нд: 08:00-21:00</span>
                                </div>
                                <Button
                                    className='cursor-pointer'
                                    variant='ghost'>
                                    Прокласти маршрут
                                </Button>
                            </div>
                        </article>
                        <article className='mt-4 max-md:flex max-md:items-start max-md:gap-x-4'>
                            <Image
                                src={flower}
                                alt='Півоній'
                                className='h-44 w-full rounded-3xl object-cover'
                            />
                            <div className='mt-6 flex flex-col gap-y-5 py-1 max-md:mt-0 max-md:min-h-full max-md:justify-between'>
                                <h1 className='text-lg font-medium max-lg:text-base'>
                                    вул. Велика Кільцева, 6
                                </h1>
                                <div className='flex items-center justify-between gap-x-5 gap-y-3 text-lg text-muted max-lg:text-base max-md:flex-col max-md:items-start'>
                                    <Link
                                        className='transition-colors hover:text-accent'
                                        href='tel:0500000000'>
                                        050 000 00 00{' '}
                                    </Link>
                                    <span>Пн-Нд: 08:00-21:00</span>
                                </div>
                                <Button
                                    className='cursor-pointer'
                                    variant='ghost'>
                                    Прокласти маршрут
                                </Button>
                            </div>
                        </article>
                    </ScrollArea>
                </div>
                <iframe
                    className='h-96 w-full rounded-3xl border-none'
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.7586988519447!2d26.271852576726296!3d50.63159927162738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f15c3b586a6f9%3A0x578ed8236f6d0a32!2zQU1TVEVSIC0g0JzQsNCz0LDQt9C40L0g0JrQstGW0YLRltCy!5e0!3m2!1sru!2sua!4v1729455794707!5m2!1sru!2sua'
                    width='600'
                    height='450'
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'></iframe>
            </div>
        </div>
    )
}
