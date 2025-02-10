'use client'

import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const currencies = [
    {
        value: 'UAH',
        label: '₴ UAH'
    },
    {
        value: 'EUR',
        label: '€ EUR'
    },
    {
        value: 'USD',
        label: '$ USD'
    }
] as const

type CurrencyType = (typeof currencies)[number]['value']

interface CurrencySelectorProps {
    className?: string
}

export const CurrencySelector = ({ className }: CurrencySelectorProps) => {
    const [isPending, startTransition] = useTransition()
    const t = useTranslations('Common')

    const currentCurrency = (Cookies.get('NEXT_CURRENCY') as CurrencyType) || 'UAH'

    const handleCurrencyChange = (currency: CurrencyType) => {
        startTransition(() => {
            Cookies.set('NEXT_CURRENCY', currency, { path: '/' })
        })
    }

    return (
        <Select
            defaultValue={currentCurrency}
            onValueChange={handleCurrencyChange}
            disabled={isPending}
        >
            <SelectTrigger className={cn('w-32 border-none', className)}>
                <SelectValue placeholder={t('selectCurrency')} />
            </SelectTrigger>
            <SelectContent>
                {currencies.map(({ value, label }) => (
                    <SelectItem
                        key={value}
                        value={value}
                        className='flex items-center gap-2 font-medium'
                    >
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
