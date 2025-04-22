'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { DiscountForm } from '../../flower/[id]/components/discount-form'

import { CheckoutInfoCard } from './checkout-info-card'
import type { ApiResponse } from '@/api/api.types'
import { cartsService } from '@/api/carts/carts-service'
import type { Cart } from '@/api/carts/carts-types'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface CheckoutInfoProps {
    initialCartResponse: ApiResponse<Cart>
}
export const CheckoutInfo = ({ initialCartResponse }: CheckoutInfoProps) => {
    const { data: carts } = useQuery({
        queryKey: ['carts'],
        queryFn: () => cartsService.get({}),
        initialData: initialCartResponse
    })

    const total = carts?.results?.reduce((acc, cart) => {
        return acc + cart.amount * +cart.variant.price
    }, 0)

    const t = useTranslations('CheckoutPage')
    return (
        <div className='w-full max-w-xl space-y-8 rounded-l-3xl bg-accent p-11'>
            <div className='flex items-center justify-between gap-4'>
                <h2 className='text-xl font-medium'>{t('your-order')}</h2>

                <button className='text-sm text-primary/50 underline transition-colors hover:text-primary'>
                    {t('edit-order')}
                </button>
            </div>

            <div className='space-y-5'>
                {carts?.results?.map((cart) => (
                    <CheckoutInfoCard
                        key={cart.id}
                        cart={cart}
                    />
                ))}
            </div>

            <DiscountForm variant='primary' />

            <BonusBlock variant='primary' />

            <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between gap-4'>
                    <div className='text-xl font-medium'>{t('discount')}</div>
                    <div className='text-xl font-medium'>0₴</div>
                </div>
                <div className='flex items-center justify-between gap-4'>
                    <div className='text-xl font-medium'>{t('total')}</div>
                    <div className='text-xl font-medium'>{total}₴</div>
                </div>
            </div>
        </div>
    )
}

interface DiscountFormProps {
    variant?: 'primary' | 'accent'
}

export const BonusBlock = ({ variant = 'accent' }: DiscountFormProps) => {
    const t = useTranslations('CheckoutPage')
    const [discount, setDiscount] = useState('')

    const bonuses = 35

    return (
        <div className='flex flex-col items-end gap-2'>
            <div className='flex w-full items-center justify-between gap-10'>
                <div className='-mb-2 flex h-11 items-center gap-3'>
                    <svg
                        width='44'
                        height='44'
                        viewBox='0 0 44 44'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <circle
                            cx='22'
                            cy='22'
                            r='16.5'
                            stroke='#002D44'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M17.4166 22.0003V14.667H24.147C28.165 14.667 28.7291 20.6394 24.9819 22.0003M17.4166 22.0003V29.3337H24.147C28.165 29.3337 28.7291 23.3613 24.9819 22.0003M17.4166 22.0003H24.9819'
                            stroke='#002D44'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>

                    <span className='text-lg'>
                        {bonuses} {t('bonuses')}
                    </span>
                </div>
                <Input
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className={cn('h-11 w-full max-w-60', {
                        'border-accent/50': variant === 'accent',
                        'border-primary/50': variant === 'primary'
                    })}
                    variant='underline'
                    placeholder={t('bonus-placeholder')}
                />
            </div>
            <Tooltip>
                <TooltipTrigger>{t('what-is-bonus')}</TooltipTrigger>
                <TooltipContent>
                    <p>Some text</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}
