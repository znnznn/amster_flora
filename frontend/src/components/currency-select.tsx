'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const currencyOptions = [
    {
        value: 'uah',
        label: 'UAH | ₴'
    },
    {
        value: 'usd',
        label: 'USD | $'
    },
    {
        value: 'eur',
        label: 'EUR | €'
    }
]

const setCurrencyInCookie = (currency: string) => {
    document.cookie = `currency=${currency}; path=/; max-age=31536000; SameSite=Strict`
}

const getCurrencyFromCookie = () => {
    const currencyCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('currency='))
    return currencyCookie ? currencyCookie.split('=')[1] : null
}

export const CurrencySelect = () => {
    const defaultCurrency = 'uah'

    const selectedCurrency = getCurrencyFromCookie() || defaultCurrency

    const handleCurrencyChange = (newCurrency: string) => {
        setCurrencyInCookie(newCurrency)
    }

    return (
        <Select
            defaultValue={selectedCurrency}
            onValueChange={handleCurrencyChange}>
            <SelectTrigger className='w-20 border-none bg-transparent p-0 font-medium focus:ring-0 focus:ring-offset-0'>
                <SelectValue placeholder='Select a fruit' />
            </SelectTrigger>
            <SelectContent className='border-primary bg-accent text-primary'>
                {currencyOptions.map((currency) => (
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
