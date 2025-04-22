import { CircleCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

import type { Cart } from '@/api/carts/carts-types'
import imageFallback from '@/assets/images/flower.png'

interface CheckoutInfoCardProps {
    cart: Cart
}
export const CheckoutInfoCard = ({ cart }: CheckoutInfoCardProps) => {
    const t = useTranslations('CartPage')
    const [amount] = useState(cart.amount)

    return (
        <div className='flex flex-col items-center justify-center gap-4 rounded-xl'>
            <div className='flex w-full items-center justify-between gap-10'>
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
                <div className='flex size-full flex-col items-start justify-between gap-3.5'>
                    <div className='flex h-full flex-col items-start justify-between gap-4'>
                        <div className='flex flex-col gap-3'>
                            <h3 className='text-lg font-medium text-primary'>
                                {cart.variant.product.name}
                            </h3>
                            <div className='flex items-center gap-1'>
                                <CircleCheck className='size-4' />
                                <span className='text-xs'>{t('in-stock')}</span>
                            </div>
                        </div>
                    </div>
                    <div className='text-xl font-medium'>
                        {amount * +cart.variant.price} ₴
                    </div>
                </div>
            </div>
        </div>
    )
}
