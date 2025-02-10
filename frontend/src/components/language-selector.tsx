'use client'

import Cookies from 'js-cookie'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo, useTransition } from 'react'
import type flags from 'react-phone-number-input/flags'

import { FlagComponent } from '@/components/ui/phone-input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const localeToCountry: Record<string, keyof typeof flags> = {
    uk: 'UA',
    en: 'GB'
}

interface LanguageSelectorProps {
    className?: string
}

export const LanguageSelector = ({ className }: LanguageSelectorProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()
    const currentLocale = useLocale()
    const t = useTranslations('Common')

    const localeDisplayNames = useMemo(() => {
        return routing.locales.map((locale) => ({
            value: locale,
            label: locale.toUpperCase(),
            countryCode: localeToCountry[locale]
        }))
    }, [routing.locales])

    const handleLocaleChange = (newLocale: string) => {
        startTransition(() => {
            Cookies.set('NEXT_LOCALE', newLocale, { path: '/' })

            const newPath = pathname.replace(/^\/[^\/]+/, `/${newLocale}`)
            router.push(newPath)
            router.refresh()
        })
    }

    return (
        <Select
            defaultValue={currentLocale}
            onValueChange={handleLocaleChange}
            disabled={isPending}
        >
            <SelectTrigger className={cn('w-32 border-none', className)}>
                <SelectValue placeholder={t('selectLanguage')} />
            </SelectTrigger>
            <SelectContent>
                {localeDisplayNames.map(({ value, label, countryCode }) => (
                    <SelectItem
                        key={value}
                        value={value}
                        className='flex items-center gap-2'
                    >
                        <div className='flex items-center gap-2'>
                            <FlagComponent
                                className='size-4 rounded-full [&_svg]:scale-150'
                                country={countryCode}
                                countryName={label}
                            />
                            {label}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
