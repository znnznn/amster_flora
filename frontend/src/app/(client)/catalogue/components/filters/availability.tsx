'use client'

import { useQueryState } from 'nuqs'

import { Checkbox } from '@/components/ui/checkbox'

const availabilityOptions = [
    { id: 'in-stock', label: 'В наявності' },
    { id: 'out-of-stock', label: 'Не в наявності' }
]

export const AvailabilityFilter = () => {
    const [availability, setAvailability] = useQueryState('availability', {
        defaultValue: ''
    })

    const selectedAvailability = availability ? availability.split(',') : []

    const handleValueChange = (availabilityId: string) => {
        const updatedAvailability = selectedAvailability.includes(availabilityId)
            ? selectedAvailability.filter((a) => a !== availabilityId)
            : [...selectedAvailability, availabilityId]

        setAvailability(updatedAvailability.join(','))
    }

    return (
        <ul className='mt-4 flex flex-col gap-y-3'>
            {availabilityOptions.map((availabilityOption) => (
                <li
                    key={availabilityOption.id}
                    className='flex items-center gap-x-3'>
                    <Checkbox
                        id={availabilityOption.id}
                        className='rounded-full border-accent'
                        checked={selectedAvailability.includes(availabilityOption.id)}
                        onCheckedChange={() => handleValueChange(availabilityOption.id)}
                    />
                    <label
                        htmlFor={availabilityOption.id}
                        className='flex items-center gap-x-1.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                        {availabilityOption.label}
                    </label>
                </li>
            ))}
        </ul>
    )
}
