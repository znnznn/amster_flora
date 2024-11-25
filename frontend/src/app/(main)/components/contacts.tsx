import { Clock, Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import contacts from '@/assets/images/contacts.jpg'
import { cn } from '@/lib/utils'
import { CityTabs } from './city-tabs'
import { ContactsForm } from './contacts-form'

export const Contacts = () => {
    return (
        <section
            className='container mt-28 max-md:mt-20 max-sm:mt-12'
            id='contacts'>
            <h2 className='text-center text-2xl font-bold max-md:text-lg'>Контакти</h2>
            <CityTabs className='mt-5 hidden flex-row gap-x-2 max-lg:flex' />
            <iframe
                className='mt-5 hidden h-96 w-full rounded-3xl border-none max-lg:block'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.7586988519447!2d26.271852576726296!3d50.63159927162738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f15c3b586a6f9%3A0x578ed8236f6d0a32!2zQU1TVEVSIC0g0JzQsNCz0LDQt9C40L0g0JrQstGW0YLRltCy!5e0!3m2!1sru!2sua!4v1729455794707!5m2!1sru!2sua'
                width='600'
                height='450'
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'></iframe>

            <ContactsList className='mt-6 hidden max-lg:flex' />

            <div className='mt-8 flex items-start justify-between gap-x-10'>
                <div className='max-w-96 max-md:max-w-full'>
                    <h3 className='text-2xl font-bold max-md:text-lg'>
                        Зворотній дзвінок
                    </h3>
                    <p className='mt-4 font-medium'>
                        Введіть ваше ім'я та номер телефону, ми зв'яжемося з вами
                        найближчим часом
                    </p>

                    <ContactsForm />
                </div>

                <div className='relative max-lg:hidden'>
                    <div
                        className='flex h-[480px] w-[360px] shrink-0 items-center justify-center rounded-3xl bg-cover bg-center bg-no-repeat'
                        style={{
                            backgroundImage: `url(${contacts.src})`
                        }}>
                        <CityTabs />
                    </div>

                    <div className='absolute right-[77%] top-1/2 w-[320px] -translate-y-1/2 rounded-3xl border bg-background px-6 py-8'>
                        <ContactsList />
                    </div>
                </div>
            </div>

            <iframe
                className='mt-14 h-96 w-full rounded-3xl border-none max-lg:hidden'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.7586988519447!2d26.271852576726296!3d50.63159927162738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f15c3b586a6f9%3A0x578ed8236f6d0a32!2zQU1TVEVSIC0g0JzQsNCz0LDQt9C40L0g0JrQstGW0YLRltCy!5e0!3m2!1sru!2sua!4v1729455794707!5m2!1sru!2sua'
                width='600'
                height='450'
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'></iframe>
        </section>
    )
}

const ContactsList = ({ className }: { className?: string }) => {
    return (
        <ul className={cn('flex flex-col gap-y-6', className)}>
            <li className='flex items-center gap-x-3'>
                <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-accent/40 max-lg:size-10'>
                    <MapPin className='size-7 text-primary max-lg:size-5' />
                </div>
                <span className='text-lg font-medium max-lg:text-base'>
                    Рівне, вул. Василя Червонія 18б
                </span>
            </li>
            <li className='flex items-center gap-x-3'>
                <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-accent/40 max-lg:size-10'>
                    <Clock className='size-7 text-primary max-lg:size-5' />
                </div>
                <span className='text-lg font-medium max-lg:text-base'>
                    з 8:00 до 21:00 без вихідних
                </span>
            </li>
            <li className='flex items-center gap-x-3'>
                <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-accent/40 max-lg:size-10'>
                    <Phone className='size-7 text-primary max-lg:size-5' />
                </div>
                <Link
                    className='text-lg font-medium transition-colors hover:text-accent max-lg:text-base'
                    href='tel:+3800687778893'>
                    +380 068 777 88 93
                </Link>
            </li>
            <li className='flex items-center justify-center gap-x-8'>
                <Link
                    className='transition-colors hover:text-accent'
                    href='tel:+3800687778893'>
                    <Facebook className='size-7 max-lg:size-5' />
                </Link>
                <Link
                    className='transition-colors hover:text-accent'
                    href='tel:+3800687778893'>
                    <Instagram className='size-7 max-lg:size-5' />
                </Link>
            </li>
        </ul>
    )
}
