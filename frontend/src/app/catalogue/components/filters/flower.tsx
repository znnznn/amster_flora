'use client'

import { useQueryState } from 'nuqs'

import { Checkbox } from '@/components/ui/checkbox'

const flowerOptions = [
    { id: 'rose', label: 'Троянда' },
    { id: 'tulip', label: 'Тюльпан' },
    { id: 'lily', label: 'Лілія' }
]

export const FlowerFilter = () => {
    const [flower, setFlower] = useQueryState('flower', { defaultValue: '' })

    const selectedFlowers = flower ? flower.split(',') : []

    const handleValueChange = (flowerId: string) => {
        const updatedFlowers = selectedFlowers.includes(flowerId)
            ? selectedFlowers.filter((f) => f !== flowerId)
            : [...selectedFlowers, flowerId]

        setFlower(updatedFlowers.join(','))
    }

    return (
        <ul className='mt-4 flex flex-col gap-y-3'>
            {flowerOptions.map((flowerOption) => (
                <li
                    key={flowerOption.id}
                    className='flex items-center gap-x-3'>
                    <Checkbox
                        id={flowerOption.id}
                        className='rounded-full border-accent'
                        checked={selectedFlowers.includes(flowerOption.id)}
                        onCheckedChange={() => handleValueChange(flowerOption.id)}
                    />
                    <label
                        htmlFor={flowerOption.id}
                        className='flex items-center gap-x-1.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                        {flowerOption.label}
                    </label>
                </li>
            ))}
        </ul>
    )
}
