'use client'

import { Minus, Plus, Trash } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// @ts-ignore
interface StepperInputProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    min?: number
    max?: number
    step?: number
    defaultValue?: number
    onChange?: (value: number) => void
    disabled?: boolean
}

export const StepperInput = ({
    min = 0,
    max = 100,
    step = 1,
    defaultValue = min,
    onChange,
    disabled = false,
    className
}: StepperInputProps) => {
    const [value, setValue] = useState(defaultValue)

    const roundToStep = (numValue: number) => {
        const roundedValue = Math.round((numValue - min) / step) * step + min
        return Math.max(min, Math.min(roundedValue, max))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numValue = parseInt(e.target.value, 10)

        if (isNaN(numValue)) numValue = min

        const correctedValue = roundToStep(numValue)

        setValue(correctedValue)
        onChange?.(correctedValue)
    }

    const handleIncrement = () => {
        const newValue = Math.min(value + step, max)
        setValue(newValue)
        onChange?.(newValue)
    }

    const handleDecrement = () => {
        const newValue = Math.max(value - step, min)
        setValue(newValue)
        onChange?.(newValue)
    }

    return (
        <div
            className={cn(
                'flex items-center space-x-2 rounded-md border border-accent bg-primary text-accent',
                className
            )}>
            <Button
                variant='link'
                size='icon'
                onClick={handleDecrement}
                disabled={disabled}>
                {value <= min ? (
                    <Trash className='size-4 text-accent' />
                ) : (
                    <Minus className='size-4 text-accent' />
                )}
            </Button>
            <Input
                className='h-10 w-20 border-none bg-transparent text-center focus-visible:ring-0 focus-visible:ring-offset-0'
                type='number'
                value={value}
                onChange={handleChange}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
            />
            <Button
                variant='link'
                size='icon'
                onClick={handleIncrement}
                disabled={value >= max || disabled}>
                <Plus className='size-4 text-accent' />
            </Button>
        </div>
    )
}
