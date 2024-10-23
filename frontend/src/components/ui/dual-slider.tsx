'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface DualSliderProps {
    className?: string
    min: number
    max: number
    minStepsBetweenThumbs: number
    step: number
    formatLabel?: (value: number) => string
    value?: number[] | readonly number[]
    onValueChange?: (values: number[]) => void
}

const DualSlider = React.forwardRef(
    (
        {
            className,
            min,
            max,
            step,
            formatLabel,
            value,
            onValueChange,
            ...props
        }: DualSliderProps,
        ref
    ) => {
        const initialValue = Array.isArray(value) ? value : [min, max]
        const [localValues, setLocalValues] = useState(initialValue)

        useEffect(() => {
            // Update localValues when the external value prop changes
            setLocalValues(Array.isArray(value) ? value : [min, max])
        }, [min, max, value])

        const handleValueChange = (newValues: number[]) => {
            setLocalValues(newValues)
            if (onValueChange) {
                onValueChange(newValues)
            }
        }

        return (
            <SliderPrimitive.Root
                ref={ref as React.RefObject<HTMLDivElement>}
                min={min}
                max={max}
                step={step}
                value={localValues}
                onValueChange={handleValueChange}
                className={cn(
                    'relative mb-4 flex w-full touch-none select-none items-center',
                    className
                )}
                {...props}>
                <SliderPrimitive.Track className='relative h-0.5 w-full grow overflow-hidden rounded-full bg-accent/20'>
                    <SliderPrimitive.Range className='absolute h-full bg-accent' />
                </SliderPrimitive.Track>
                {localValues.map((value, index) => (
                    <React.Fragment key={index}>
                        <div
                            className='absolute text-center'
                            style={{
                                left: `calc(${((value - min) / (max - min)) * 100}% + 0px)`,
                                top: `10px`
                            }}>
                            <span className='text-sm'>
                                {formatLabel ? formatLabel(value) : value}
                            </span>
                        </div>
                        <SliderPrimitive.Thumb className='block h-4 w-4 rounded-full border border-accent bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50' />
                    </React.Fragment>
                ))}
            </SliderPrimitive.Root>
        )
    }
)

DualSlider.displayName = SliderPrimitive.Root.displayName

export { DualSlider }
