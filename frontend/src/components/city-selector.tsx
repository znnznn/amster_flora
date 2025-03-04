'use client'

import { useTranslations } from 'next-intl'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { CITY_OPTIONS, DEFAULT_CITY } from '@/config/app'
import { useCookie } from '@/hooks/use-cookie'
import { cn } from '@/lib/utils'

interface CitySelectorProps {
    className?: string
    city?: string
    setCity?: (city: string) => void
}

export const CitySelector = ({
    className,
    city: propCity,
    setCity: propSetCity
}: CitySelectorProps) => {
    const t = useTranslations('Common')

    // Use cookie values as fallback if props aren't provided
    const [cookieCity, setCookieCity] = useCookie('NEXT_CITY', DEFAULT_CITY)

    const city = propCity !== undefined ? propCity : cookieCity

    const handleCityChange = (newCity: string) => {
        if (propSetCity) {
            propSetCity(newCity)
        } else {
            setCookieCity(newCity)
        }
    }

    return (
        <Select
            defaultValue={city}
            onValueChange={handleCityChange}
        >
            <SelectTrigger className={cn('w-32', className)}>
                <SelectValue placeholder={t('CityPopup.Select')} />
            </SelectTrigger>
            <SelectContent>
                {CITY_OPTIONS.map((cityOption) => (
                    <SelectItem
                        key={cityOption}
                        value={cityOption}
                        className='flex items-center gap-2 font-medium'
                    >
                        {cityOption}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
