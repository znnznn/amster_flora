'use client'

import { useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { cityConfig } from '@/config/app'
import { useCookie } from '@/hooks/use-cookies'

export const CitySelect = () => {
    const [initialCity] = useCookie('city', cityConfig.default)

    const [city, setCIty] = useState(initialCity)

    return (
        <Select
            value={city}
            onValueChange={setCIty}>
            <SelectTrigger>
                <SelectValue placeholder='Місто' />
            </SelectTrigger>
            <SelectContent>
                {cityConfig.options.map((city) => (
                    <SelectItem
                        key={city}
                        value={city}>
                        {city}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
