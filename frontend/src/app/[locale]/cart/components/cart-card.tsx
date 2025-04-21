'use client'

import { CircleCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

import { ToCartButton } from './to-cart-button'
import type { Cart } from '@/api/carts/carts-types'
import imageFallback from '@/assets/images/flower.png'
import { AddLetterPopup } from '@/components/add-letter-popup'

interface CartCardProps {
    cart: Cart
}
export const CartCard = ({ cart }: CartCardProps) => {
    const t = useTranslations('CartPage')

    const [amount, setAmount] = useState(cart.amount)

    return (
        <>
            <div className='flex h-[185px] items-center gap-x-10 rounded-xl border p-4 max-md:hidden'>
                <div className='h-full w-[190px]'>
                    {cart.variant.image ? (
                        <Image
                            src={cart.variant.image}
                            alt='flower'
                            className='size-full rounded-[14px] object-cover'
                        />
                    ) : (
                        <Image
                            src={imageFallback}
                            alt='flower'
                            className='size-full rounded-[14px] object-cover'
                        />
                    )}
                </div>
                <div className='flex h-full w-full items-center justify-between gap-10'>
                    <div className='flex h-full flex-col items-start justify-between gap-4'>
                        <div className='flex flex-col gap-3'>
                            <h3 className='text-xl font-medium text-primary'>
                                Букет півоній
                            </h3>
                            <div className='flex items-center gap-1'>
                                <CircleCheck className='size-4' />
                                <span className='text-xs'>{t('in-stock')}</span>
                            </div>
                        </div>
                        <AddLetterPopup />
                    </div>
                    <div className='text-xl font-medium'>
                        {amount * +cart.variant.price} ₴
                    </div>
                    <ToCartButton
                        cart={cart}
                        value={amount}
                        setValue={setAmount}
                    />
                </div>
            </div>
            <MobileCartCard cart={cart} />
        </>
    )
}

const MobileCartCard = ({ cart }: CartCardProps) => {
    const t = useTranslations('CartPage')
    const [amount, setAmount] = useState(cart.amount)

    return (
        <div className='flex flex-col items-center justify-center gap-4 rounded-xl border p-2 md:hidden'>
            <div className='flex w-full items-center justify-between gap-5'>
                <div className='h-full w-[156px] shrink-0'>
                    {cart.variant.image ? (
                        <Image
                            src={cart.variant.image}
                            alt='flower'
                            className='size-full rounded-[14px] object-cover'
                        />
                    ) : (
                        <Image
                            src={imageFallback}
                            alt='flower'
                            className='size-full rounded-[14px] object-cover'
                        />
                    )}
                </div>
                <div className='flex size-full flex-col items-start justify-between gap-2.5'>
                    <div className='flex h-full flex-col items-start justify-between gap-4'>
                        <div className='flex flex-col gap-3'>
                            <h3 className='text-lg font-medium text-primary'>
                                Букет півоній
                            </h3>
                            <div className='flex items-center gap-1'>
                                <CircleCheck className='size-4' />
                                <span className='text-xs'>{t('in-stock')}</span>
                            </div>
                        </div>
                    </div>
                    <div className='font-medium'>{amount * +cart.variant.price} ₴</div>
                    <ToCartButton
                        cart={cart}
                        value={amount}
                        setValue={setAmount}
                    />
                </div>
            </div>
            <AddLetterPopup />
        </div>
    )
}
