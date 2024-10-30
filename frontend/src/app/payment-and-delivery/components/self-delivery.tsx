import Image from 'next/image'
import Link from 'next/link'

import { CitySelect } from './city-select'
import flower from '@/assets/images/flower.jpg'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export const SelfDelivery = () => {
    return (
        <section className='mt-12 px-20 max-md:px-16 max-sm:mt-8 max-sm:px-6'>
            <h2 className='text-[28px] font-semibold'>Самовивіз</h2>

            <div className='mr-8 mt-10 flex items-start justify-between gap-x-10'>
                <div className='w-1/2'>
                    <CitySelect />
                    <ScrollArea className='mt-6 h-80 pr-6'>
                        <article>
                            <Image
                                src={flower}
                                alt='Півоній'
                                className='h-40 w-full rounded-[22px] object-cover'
                            />
                            <div className='mt-6 flex flex-col gap-y-5'>
                                <h1 className='text-lg font-medium'>
                                    вул. Велика Кільцева, 6
                                </h1>
                                <div className='flex items-center justify-between gap-x-5 text-lg text-muted'>
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
                        <article className='mt-4'>
                            <Image
                                src={flower}
                                alt='Півоній'
                                className='h-40 w-full rounded-[22px] object-cover'
                            />
                            <div className='mt-6 flex flex-col gap-y-5'>
                                <h1 className='text-lg font-medium'>
                                    вул. Велика Кільцева, 6
                                </h1>
                                <div className='flex items-center justify-between gap-x-5 text-lg text-muted'>
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
                    className='h-96 w-full rounded-[22px] border-none'
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.7586988519447!2d26.271852576726296!3d50.63159927162738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f15c3b586a6f9%3A0x578ed8236f6d0a32!2zQU1TVEVSIC0g0JzQsNCz0LDQt9C40L0g0JrQstGW0YLRltCy!5e0!3m2!1sru!2sua!4v1729455794707!5m2!1sru!2sua'
                    width='600'
                    height='450'
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'></iframe>
            </div>
        </section>
    )
}
