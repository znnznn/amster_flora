import { Clock, Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { CityTabs } from './city-tabs'
import { ContactsForm } from './contacts-form'
import contacts from '@/assets/images/contacts.jpg'

export const Contacts = () => {
    return (
        <section
            className='mt-28 px-20 max-md:mt-16 max-md:px-16 max-sm:mt-10 max-sm:px-6'
            id='contacts'>
            <h2 className='text-center text-[28px] font-bold'>Контакти</h2>

            <div className='mt-10 flex items-start justify-between gap-x-10'>
                <div className='max-w-96'>
                    <h3 className='text-[28px] font-bold'>Зворотній дзвінок</h3>
                    <p className='mt-4 font-medium'>
                        Введіть ваше ім'я та номер телефону, ми зв'яжемося з вами
                        найближчим часом
                    </p>

                    <ContactsForm />
                </div>

                <div className='relative'>
                    <div
                        className='flex h-[480px] w-[360px] shrink-0 items-center justify-center rounded-[22px] bg-cover bg-center bg-no-repeat'
                        style={{
                            backgroundImage: `url(${contacts.src})`
                        }}>
                        <CityTabs />
                    </div>

                    <div className='absolute right-[88%] top-1/2 w-[320px] -translate-y-1/2 rounded-[22px] border bg-background px-6 py-8'>
                        <ul className='flex flex-col gap-y-6'>
                            <li className='flex items-center gap-x-3'>
                                <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-accent/40'>
                                    <MapPin className='size-7 text-primary' />
                                </div>
                                <span className='text-lg font-medium'>
                                    Рівне, вул. Василя Червонія 18б
                                </span>
                            </li>
                            <li className='flex items-center gap-x-3'>
                                <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-accent/40'>
                                    <Clock className='size-7 text-primary' />
                                </div>
                                <span className='text-lg font-medium'>
                                    з 8:00 до 21:00 без вихідних
                                </span>
                            </li>
                            <li className='flex items-center gap-x-3'>
                                <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-accent/40'>
                                    <Phone className='size-7 text-primary' />
                                </div>
                                <Link
                                    className='text-lg font-medium transition-colors hover:text-accent'
                                    href='tel:+3800687778893'>
                                    +380 068 777 88 93
                                </Link>
                            </li>
                            <li className='flex items-center justify-center gap-x-8'>
                                <Link
                                    className='transition-colors hover:text-accent'
                                    href='tel:+3800687778893'>
                                    <Facebook className='size-7' />
                                </Link>
                                <Link
                                    className='transition-colors hover:text-accent'
                                    href='tel:+3800687778893'>
                                    <Instagram className='size-7' />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <iframe
                className='mt-14 h-96 w-full rounded-[22px] border-none'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.7586988519447!2d26.271852576726296!3d50.63159927162738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f15c3b586a6f9%3A0x578ed8236f6d0a32!2zQU1TVEVSIC0g0JzQsNCz0LDQt9C40L0g0JrQstGW0YLRltCy!5e0!3m2!1sru!2sua!4v1729455794707!5m2!1sru!2sua'
                width='600'
                height='450'
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'></iframe>
        </section>
    )
}
