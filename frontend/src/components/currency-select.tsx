'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { currencyConfig } from '@/config/app'
import { useCookie } from '@/hooks/use-cookies'

export const CurrencySelect = () => {
    const [currency, setCurrency] = useCookie('currency', currencyConfig.default)

    return (
        <Select
            defaultValue={currency}
            onValueChange={setCurrency}>
            <SelectTrigger className='w-20 border-none bg-transparent p-0 font-medium focus:ring-0 focus:ring-offset-0'>
                <SelectValue placeholder='Select a fruit' />
            </SelectTrigger>
            <SelectContent className='border-primary bg-accent text-primary'>
                {currencyConfig.options.map((currency) => (
                    <SelectItem
                        key={currency.value}
                        className='font-medium hover:bg-primary hover:text-accent-foreground'
                        value={currency.value}>
                        {currency.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
