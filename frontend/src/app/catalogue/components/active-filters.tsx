'use client'

import { X } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { SortingFilter } from './filters/sorting'
import { Button } from '@/components/ui/button'

export const ActiveFilters = () => {
    const [color, setColor] = useQueryState('color', { defaultValue: '' })
    const [flower, setFlower] = useQueryState('flower', { defaultValue: '' })
    const [availability, setAvailability] = useQueryState('availability', {
        defaultValue: ''
    })
    const [size, setSize] = useQueryState('size', { defaultValue: '' })

    const resetAllFilters = () => {
        setColor('')
        setFlower('')
        setAvailability('')
        setSize('')
    }

    const activeFilters = [
        { label: 'Колір', values: color.split(','), setFilter: setColor },
        { label: 'Квітка', values: flower.split(','), setFilter: setFlower },
        {
            label: 'Наявність',
            values: availability.split(','),
            setFilter: setAvailability
        },
        { label: 'Розмір', values: size.split(','), setFilter: setSize }
    ].filter((filter) => filter.values.some((value) => value))

    const isActiveFilters = activeFilters.some((filter) => filter.values.length)

    return (
        <div className='flex items-end justify-between gap-x-6 pt-3'>
            <div className='flex flex-col gap-y-3'>
                <span className='text-sm'>Знайдено 444 товарів</span>
                <div className='flex items-center gap-x-4'>
                    <Button
                        disabled={!isActiveFilters}
                        onClick={resetAllFilters}
                        className='text-accent'
                        variant='outline'>
                        Скинути фільтри
                    </Button>
                    <ul className='flex items-center gap-x-2'>
                        {activeFilters.map(({ label, values, setFilter }) =>
                            values.map(
                                (value, index) =>
                                    value && (
                                        <li key={`${label}-${index}`}>
                                            <ActiveFilter
                                                label={label}
                                                value={value}
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
            <SortingFilter />
        </div>
    )
}

const ActiveFilter = ({
    label,
    value,
    allValues,
    setFilter
}: {
    label: string
    value: string
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
                {label}: {value}
            </span>
            <X className='h-4 w-4' />
        </button>
    )
}
