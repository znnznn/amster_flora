'use client'

import Image from 'next/image'

import EnFlag from '@/assets/images/flags/en.png'
import UaFlag from '@/assets/images/flags/ua.png'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const langOptions = [
    {
        value: 'uk',
        label: 'Українська',
        icon: UaFlag
    },
    {
        value: 'en',
        label: 'English',
        icon: EnFlag
    }
]

const setLangInCookie = (lang: string) => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Strict`
}

const getLangFromCookie = () => {
    const langCookie = document.cookie.split('; ').find((row) => row.startsWith('lang='))
    return langCookie ? langCookie.split('=')[1] : null
}

export const LangSelect = () => {
    const defaultLang = 'uk'

    const selectedLang = getLangFromCookie() || defaultLang

    const handleLangChange = (newLang: string) => {
        setLangInCookie(newLang)
    }

    return (
        <Select
            defaultValue={selectedLang}
            onValueChange={handleLangChange}>
            <SelectTrigger className='w-32 border-none bg-transparent p-0 font-medium focus:ring-0 focus:ring-offset-0'>
                <SelectValue placeholder='Select a fruit' />
            </SelectTrigger>
            <SelectContent className='border-primary bg-accent text-primary'>
                {langOptions.map((lang) => (
                    <SelectItem
                        key={lang.value}
                        className='font-medium hover:bg-primary hover:text-accent-foreground'
                        value={lang.value}>
                        <div className='flex items-center gap-x-2'>
                            <Image
                                width={16}
                                height={16}
                                src={lang.icon}
                                alt={lang.label}
                            />
                            {lang.label}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
