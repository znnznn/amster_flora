'use client'

import { X } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { OrderingFilter } from './filters/ordering'
import { Button } from '@/components/ui/button'

const colorLabels = {
    red: 'Червоний',
    yellow: 'Жовтий',
    white: 'Білий'
} as const

const flowerLabels = {
    rose: 'Троянда',
    tulip: 'Тюльпан',
    lilly: 'Лілія'
} as const

const availabilityLabels = {
    'in-stock': 'В наявності',
    'out-of-stock': 'Не в наявності'
} as const

const sizeLabels = {
    small: 'S',
    medium: 'M',
    large: 'L'
} as const

interface ActiveFiltersProps {
    productsCount: number
}

export const ActiveFilters = ({ productsCount }: ActiveFiltersProps) => {
    const [color, setColor] = useQueryState('color', { defaultValue: '', shallow: false })
    const [flower, setFlower] = useQueryState('flower', {
        defaultValue: '',
        shallow: false
    })
    const [availability, setAvailability] = useQueryState('availability', {
        defaultValue: '',
        shallow: false
    })
    const [size, setSize] = useQueryState('size', { defaultValue: '', shallow: false })

    const resetAllFilters = () => {
        setColor('')
        setFlower('')
        setAvailability('')
        setSize('')
    }

    const activeFilters = [
        {
            label: 'Колір',
            values: color.split(','),
            setFilter: setColor,
            labels: colorLabels
        },
        {
            label: 'Квітка',
            values: flower.split(','),
            setFilter: setFlower,
            labels: flowerLabels
        },
        {
            label: 'Наявність',
            values: availability.split(','),
            setFilter: setAvailability,
            labels: availabilityLabels
        },
        {
            label: 'Розмір',
            values: size.split(','),
            setFilter: setSize,
            labels: sizeLabels as any
        }
    ].filter((filter) => filter.values.some((value) => value))

    const isActiveFilters = activeFilters.some((filter) => filter.values.length)

    return (
        <div className='flex items-end justify-between gap-x-6 pt-3 max-lg:hidden'>
            <div className='flex flex-col gap-y-3'>
                <span className='text-sm'>Знайдено {productsCount} товарів</span>
                <div className='flex items-center gap-x-4'>
                    <Button
                        disabled={!isActiveFilters}
                        onClick={resetAllFilters}
                        className='text-accent'
                        variant='outline'>
                        Скинути фільтри
                    </Button>
                    <ul className='flex items-center gap-x-2'>
                        {activeFilters.map(({ label, values, setFilter, labels }) =>
                            values.map(
                                (value, index) =>
                                    value && (
                                        <li key={`${label}-${index}`}>
                                            <ActiveFilter
                                                label={label}
                                                value={value}
                                                valueLabel={labels[value] || value}
                                                setFilter={setFilter}
                                                allValues={values}
                                            />
                                        </li>
                                    )
                            )
                        )}
                    </ul>
                </div>
            </div>
            <OrderingFilter />
        </div>
    )
}

const ActiveFilter = ({
    label,
    value,
    valueLabel,
    allValues,
    setFilter
}: {
    label: string
    value: string
    valueLabel: string
    allValues: string[]
    setFilter: (value: string) => void
}) => {
    const removeFilter = () => {
        const newFilters = allValues.filter((filter) => filter !== value)
        setFilter(newFilters.join(','))
    }

    return (
        <button
            onClick={removeFilter}
            className='flex cursor-pointer items-center gap-x-2 rounded-sm p-1.5 text-primary transition-colors hover:bg-accent/40'>
            <span className='text-sm underline underline-offset-2'>
                {label}: {valueLabel}
            </span>
            <X className='h-4 w-4' />
        </button>
    )
}

export const MobileActiveFilters = () => {
    const [color, setColor] = useQueryState('color', { defaultValue: '', shallow: false })
    const [flower, setFlower] = useQueryState('flower', {
        defaultValue: '',
        shallow: false
    })
    const [availability, setAvailability] = useQueryState('availability', {
        defaultValue: '',
        shallow: false
    })
    const [size, setSize] = useQueryState('size', { defaultValue: '', shallow: false })

    const resetAllFilters = () => {
        setColor('')
        setFlower('')
        setAvailability('')
        setSize('')
    }

    const activeFilters = [
        {
            label: 'Колір',
            values: color.split(','),
            setFilter: setColor,
            labels: colorLabels
        },
        {
            label: 'Квітка',
            values: flower.split(','),
            setFilter: setFlower,
            labels: flowerLabels
        },
        {
            label: 'Наявність',
            values: availability.split(','),
            setFilter: setAvailability,
            labels: availabilityLabels
        },
        {
            label: 'Розмір',
            values: size.split(','),
            setFilter: setSize,
            labels: sizeLabels as any
        }
    ].filter((filter) => filter.values.some((value) => value))

    const isActiveFilters = activeFilters.some((filter) => filter.values.length)

    return (
        <div className='flex flex-col items-start gap-4'>
            <Button
                disabled={!isActiveFilters}
                onClick={resetAllFilters}
                className='text-accent'
                variant='outline'>
                Скинути фільтри
            </Button>
            <ul className='flex flex-wrap items-center gap-3'>
                {activeFilters.map(({ label, values, setFilter, labels }) =>
                    values.map(
                        (value, index) =>
                            value && (
                                <li key={`${label}-${index}`}>
                                    <MobileActiveFilter
                                        label={label}
                                        value={value}
                                        valueLabel={labels[value] || value}
                                        setFilter={setFilter}
                                        allValues={values}
                                    />
                                </li>
                            )
                    )
                )}
            </ul>
        </div>
    )
}

const MobileActiveFilter = ({
    label,
    value,
    valueLabel,
    allValues,
    setFilter
}: {
    label: string
    value: string
    valueLabel: string
    allValues: string[]
    setFilter: (value: string) => void
}) => {
    const removeFilter = () => {
        const newFilters = allValues.filter((filter) => filter !== value)
        setFilter(newFilters.join(','))
    }

    return (
        <button
            onClick={removeFilter}
            className='flex cursor-pointer items-center gap-x-2 rounded-sm p-1.5 text-accent transition-colors hover:bg-accent/40'>
            <span className='text-sm underline underline-offset-2'>
                {label}: {valueLabel}
            </span>
            <X className='h-4 w-4' />
        </button>
    )
}
