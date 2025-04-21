'use client'

import { useCart } from '../hooks/use-cart'

import type { Cart } from '@/api/carts/carts-types'
import { buttonVariants } from '@/components/ui/button'
import { NumberInput } from '@/components/ui/number-input'
import { cn } from '@/lib/utils'

interface ToCartButtonProps {
    cart: Cart
    className?: string
    value: number
    setValue: (value: number) => void
}

export const ToCartButton = ({ cart, className, setValue, value }: ToCartButtonProps) => {
    const { handleAddToCart } = useCart({ cart })

    const handleValueChange = (newValue: number) => {
        if (newValue <= 0) {
            setValue(0)
        } else {
            setValue(newValue)
        }
        handleAddToCart(newValue)
    }

    const maxValue = +cart?.variant?.quantity || 0
    const isOutOfStock = maxValue <= 0

    return (
        <NumberInput
            className={cn(
                'max-w-40 !px-1 !text-base text-accent [&_button]:bg-transparent [&_button]:hover:!bg-transparent',
                buttonVariants({ variant: 'primary-shadow' }),
                className
            )}
            value={value}
            maxValue={maxValue}
            minValue={0}
            onChange={handleValueChange}
            disabled={isOutOfStock}
        />
    )
}
