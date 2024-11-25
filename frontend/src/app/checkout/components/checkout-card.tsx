import { CircleCheck } from 'lucide-react'
import Image from 'next/image'

import flower from '@/assets/images/flower.jpg'

export const CheckoutCard = () => {
    return (
        <div className='flex h-36 items-center gap-x-8'>
            <Image
                src={flower}
                alt='Півоній'
                className='h-full w-44 rounded-3xl object-cover'
            />
            <div className='flex h-full flex-col items-start justify-between py-3'>
                <h2 className='text-2xl font-semibold'>Букет півоній</h2>
                <div className='mt-1.5 flex items-center gap-x-2 text-sm text-muted'>
                    <CircleCheck className='size-4' />В в наявності
                </div>
                <div className='flex items-center gap-x-4'>
                    <span className='text-sm text-muted line-through'>2 300₴</span>
                    <span className='text-2xl font-medium'>2 000₴</span>
                </div>
            </div>
        </div>
    )
}
