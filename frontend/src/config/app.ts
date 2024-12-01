import EnFlag from '@/assets/images/flags/en.png'
import UaFlag from '@/assets/images/flags/ua.png'

export const cityConfig = {
    options: ['Київ', 'Львів', 'Рівне'],
    default: 'Рівне'
} as const

export const currencyConfig = {
    options: [
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
    ],
    default: 'uah'
} as const

export const langConfig = {
    options: [
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
    ],
    default: 'uk'
}
