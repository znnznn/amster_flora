'use client'

import { useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const getCityFromCookie = () => {
    const cityCookie = document.cookie.split('; ').find((row) => row.startsWith('city='))
    return cityCookie ? cityCookie.split('=')[1] : null
}

export const cityOptions = ['Київ', 'Львів', 'Рівне']

export const CitySelect = () => {
    const defaultCity = 'Рівне'

    const [city, setCIty] = useState(getCityFromCookie() || defaultCity)

    return (
        <Select
            value={city}
            onValueChange={setCIty}>
            <SelectTrigger>
                <SelectValue placeholder='Місто' />
            </SelectTrigger>
            <SelectContent>
                {cityOptions.map((city) => (
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
