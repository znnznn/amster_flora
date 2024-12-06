'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface SizeSelectProps {
    value: string
    onChange: (value: string) => void
}

const sizes = [
    {
        label: 'S',
        value: 'small'
    },
    {
        label: 'M',
        value: 'medium'
    },
    {
        label: 'L',
        value: 'large'
    },
    {
        label: 'XL',
        value: 'extra_large'
    }
]

export const SizeSelect = ({ value, onChange }: SizeSelectProps) => {
    return (
        <Select
            onValueChange={onChange}
            value={value.toString()}>
            <div className='space-y-1'>
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть розмір' />
                </SelectTrigger>
            </div>
            <SelectContent>
                {sizes?.map((size) => (
                    <SelectItem
                        key={size.value}
                        value={size.value}>
                        {size.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
