'use client'

import { Clock, Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { CityTabs } from './city-tabs'
import { ContactsForm } from './contacts-form'
import flower02 from '@/assets/images/home/flower_02.jpeg'
import { Section } from '@/components/ui/section'
import { H2 } from '@/components/ui/typography'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export const Contacts = () => {
    const t = useTranslations('HomePage.Contacts')

    return (
        <Section id='contacts'>
            <H2 className='text-center'>{t('Title')}</H2>
            <CityTabs className='mt-5 hidden flex-row gap-x-2 max-lg:flex' />
            <ContactsList className='mt-6 hidden max-lg:flex' />

            <div className='mt-8 flex items-start justify-between gap-x-10'>
                <div className='max-w-96 max-md:max-w-full'>
                    <h3 className='text-2xl font-bold max-md:text-lg'>
                        {t('Callback.Title')}
                    </h3>
                    <p className='mt-4 font-medium'>{t('Callback.Description')}</p>
                    <ContactsForm />
                </div>

                <div className='relative max-lg:hidden'>
                    <div
                        className='flex h-[480px] w-[360px] shrink-0 items-center justify-center rounded-3xl bg-cover bg-center bg-no-repeat'
                        style={{ backgroundImage: `url(${flower02.src})` }}
                    >
                        <CityTabs />
                    </div>

                    <div className='absolute right-[77%] top-1/2 w-[320px] -translate-y-1/2 rounded-3xl border bg-background px-6 py-8'>
                        <ContactsList />
                    </div>
                </div>
            </div>
        </Section>
    )
}

const ContactsList = ({ className }: { className?: string }) => {
    const t = useTranslations('HomePage.Contacts.List')
    const socialLinks = useTranslations('HomePage.Contacts.SocialLinks')

    return (
        <ul className={cn('flex flex-col gap-y-6', className)}>
            <li className='flex items-center gap-x-3'>
                <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-accent/40 max-lg:size-10'>
                    <MapPin className='size-7 text-primary max-lg:size-5' />
                </div>
                <span className='text-lg font-medium max-lg:text-base'>
                    {t('Address')}
                </span>
            </li>
            <li className='flex items-center gap-x-3'>
                <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-accent/40 max-lg:size-10'>
                    <Clock className='size-7 text-primary max-lg:size-5' />
                </div>
                <span className='text-lg font-medium max-lg:text-base'>{t('Hours')}</span>
            </li>
            <li className='flex items-center gap-x-3'>
                <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-accent/40 max-lg:size-10'>
                    <Phone className='size-7 text-primary max-lg:size-5' />
                </div>
                <Link
                    className='text-lg font-medium transition-colors hover:text-accent max-lg:text-base'
                    href={`tel:${t('Phone')}`}
                >
                    {t('Phone')}
                </Link>
            </li>
            <li className='flex items-center justify-center gap-x-8'>
                <Link
                    className='transition-colors hover:text-accent'
                    href={socialLinks('Facebook')}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <Facebook className='size-7 max-lg:size-5' />
                </Link>
                <Link
                    className='transition-colors hover:text-accent'
                    href={socialLinks('Instagram')}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <Instagram className='size-7 max-lg:size-5' />
                </Link>
            </li>
        </ul>
    )
}
