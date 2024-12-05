'use client'

import { useQueryState } from 'nuqs'

import { Checkbox } from '@/components/ui/checkbox'

const colorOptions = [
    { id: 'red', label: 'Червоний' },
    { id: 'yellow', label: 'Жовтий' },
    { id: 'white', label: 'Білий' }
]

export const ColorFilter = () => {
    const [color, setColor] = useQueryState('color', { defaultValue: '' })

    const selectedColors = color ? color.split(',') : []

    const handleValueChange = (colorId: string) => {
        const updatedColors = selectedColors.includes(colorId)
            ? selectedColors.filter((c) => c !== colorId)
            : [...selectedColors, colorId]

        setColor(updatedColors.join(','))
    }

    return (
        <ul className='mt-4 flex flex-col gap-y-3'>
            {colorOptions.map((colorOption) => (
                <li
                    key={colorOption.id}
                    className='flex items-center gap-x-3'>
                    <Checkbox
                        id={colorOption.id}
                        className='rounded-full border-accent'
                        checked={selectedColors.includes(colorOption.id)}
                        onCheckedChange={() => handleValueChange(colorOption.id)}
                    />
                    <label
                        htmlFor={colorOption.id}
                        className='flex items-center gap-x-1.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                        {colorOption.label}
                    </label>
                </li>
            ))}
        </ul>
    )
}
