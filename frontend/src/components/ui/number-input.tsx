'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button, Group, Input, NumberField } from 'react-aria-components'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NumberInputProps {
    defaultValue?: number
    minValue?: number
    maxValue?: number
    step?: number
    className?: string
    disabled?: boolean
    value: number
    onChange: (value: number) => void
}

export const NumberInput = ({
    step = 1,
    defaultValue = 0,
    minValue = Number.MIN_SAFE_INTEGER,
    maxValue = Number.MAX_SAFE_INTEGER,
    disabled,
    value,
    className,
    onChange
}: NumberInputProps) => {
    return (
        <NumberField
            value={value}
            onChange={onChange}
            isWheelDisabled
            formatOptions={{
                useGrouping: false
            }}
            defaultValue={defaultValue}
            minValue={minValue}
            maxValue={maxValue}
            isDisabled={disabled}
            step={step}
        >
            <Group
                className={cn(
                    'border-grey-300 data-focus-within:border-ring data-focus-within:ring-ring min-w-30 data-disabled:opacity-50 data-focus-within:ring-[3px] data-focus-within:has-aria-invalid:border-red-300 data-focus-within:has-aria-invalid:ring-red-300/20 dark:data-focus-within:has-aria-invalid:ring-red-300/40 relative inline-flex h-11 w-full items-center overflow-hidden whitespace-nowrap rounded-lg text-sm outline-none transition-all',
                    className
                )}
            >
                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}
                    slot='decrement'
                    className={cn(
                        '[&_svg]:!text-black-200 -ms-px aspect-square h-[inherit] rounded-s-md bg-primary hover:!bg-primary hover:text-accent',
                        buttonVariants({ size: 'icon', variant: 'ghost' })
                    )}
                >
                    {value <= 1 ? (
                        <Trash2 aria-hidden='true' />
                    ) : (
                        <Minus aria-hidden='true' />
                    )}
                </Button>
                <Input className='text-grey-500 w-full grow bg-inherit p-2.5 text-center tabular-nums outline-none' />
                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}
                    slot='increment'
                    className={cn(
                        '[&_svg]:!text-black-200 -me-px aspect-square h-[inherit] rounded-e-md bg-primary hover:!bg-primary hover:text-accent',
                        buttonVariants({ size: 'icon', variant: 'ghost' })
                    )}
                >
                    <Plus aria-hidden='true' />
                </Button>
            </Group>
        </NumberField>
    )
}
