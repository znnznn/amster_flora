'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button } from './ui/button'
import { NumberInput } from './ui/number-input'
import type { Product } from '@/api/products/products-types'
import { useProduct } from '@/hooks/use-product'

interface ToCartButtonProps {
    flower: Product
}

export const ToCartButton = ({ flower }: ToCartButtonProps) => {
    const t = useTranslations('FlowerPage')
    const { handleAddToCart } = useProduct({ singleVariantProduct: flower })

    const initialValue = flower.in_cart ? 1 : 0
    const [showInput, setShowInput] = useState(!!flower.in_cart)
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        if (flower.in_cart) {
            setShowInput(true)
            setValue(1)
        } else {
            setShowInput(false)
            setValue(0)
        }
    }, [flower.in_cart])

    const handleValueChange = (newValue: number) => {
        if (newValue <= 0) {
            setShowInput(false)
            setValue(0)
        } else {
            setValue(newValue)
        }
        handleAddToCart(newValue)
    }

    const handleShowInput = () => {
        setShowInput(true)
        setValue(1)
        handleAddToCart(1)
    }

    const maxValue = +flower?.variants[0]?.quantity || 0
    const isOutOfStock = maxValue <= 0

    if (showInput) {
        return (
            <NumberInput
                className='bg-accent text-primary [&_button]:bg-accent [&_button]:text-primary [&_button]:hover:!bg-transparent [&_svg]:!text-primary'
                value={value}
                maxValue={maxValue}
                minValue={0}
                onChange={handleValueChange}
                disabled={isOutOfStock}
            />
        )
    }

    return (
        <Button
            className='min-w-36'
            variant='accent'
            onClick={handleShowInput}
            disabled={isOutOfStock}
        >
            <span className='max-sm:hidden'>
                {isOutOfStock ? t('out-of-stock') : t('toCart')}
            </span>
            <svg
                className='!size-8 shrink-0'
                viewBox='0 0 44 44'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M10.2545 12.775H31.8091C33.7608 12.775 35.1704 14.575 34.6358 16.3844L32.2919 24.3178C31.9322 25.5353 30.7784 26.375 29.4652 26.375H16.4915C15.1783 26.375 14.0245 25.5353 13.6648 24.3178L10.2545 12.775ZM10.2545 12.775L9.25 9.375'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M16.375 34.625C17.5486 34.625 18.5 33.6736 18.5 32.5C18.5 31.3264 17.5486 30.375 16.375 30.375C15.2014 30.375 14.25 31.3264 14.25 32.5C14.25 33.6736 15.2014 34.625 16.375 34.625Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M27.625 34.625C28.7986 34.625 29.75 33.6736 29.75 32.5C29.75 31.3264 28.7986 30.375 27.625 30.375C26.4514 30.375 25.5 31.3264 25.5 32.5C25.5 33.6736 26.4514 34.625 27.625 34.625Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </Button>
    )
}
