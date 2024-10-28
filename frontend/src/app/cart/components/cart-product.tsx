import { CircleCheck } from 'lucide-react'
import Image from 'next/image'

import { StepperInput } from './stepper-input'
import flower from '@/assets/images/flower.jpg'
import { AddLetterModal } from '@/components/add-letter'

export const CartProduct = () => {
    return (
        <div className='flex h-[185px] items-center justify-between gap-x-8 rounded-2xl border p-4'>
            <Image
                src={flower}
                alt='Півоній'
                className='h-full w-48 rounded-xl object-cover'
            />
            <div className='flex h-full flex-col items-start justify-between'>
                <div>
                    <h2 className='text-[22px] font-semibold'>Букет півоній</h2>
                    <div className='mt-1.5 flex items-center gap-x-2 text-sm text-muted'>
                        <CircleCheck className='size-4' />В в наявності
                    </div>
                </div>
                <AddLetterModal />
            </div>
            <div className='flex items-center gap-x-4'>
                <span className='text-sm text-accent line-through'>2 300₴</span>
                <span className='text-[22px] font-medium'>2 000₴</span>
            </div>
            <StepperInput
                min={1}
                max={5}
                step={1}
            />
        </div>
    )
}
