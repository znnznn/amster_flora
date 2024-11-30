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
            <div className='flex h-full flex-col items-start justify-between max-lg:hidden'>
                <div>
                    <h2 className='text-2xl font-semibold max-lg:text-lg'>
                        Букет півоній
                    </h2>
                    <div className='mt-1.5 flex items-center gap-x-2 text-sm text-muted max-lg:text-xs'>
                        <CircleCheck className='size-4' />В в наявності
                    </div>
                </div>
                <AddLetterModal className='max-lg:hidden' />
            </div>
            <div className='flex items-center gap-x-4 max-lg:hidden'>
                <span className='text-sm text-accent line-through'>2 300₴</span>
                <span className='text-2xl font-medium max-lg:text-base'>2 000₴</span>
            </div>
            <StepperInput
                className='max-lg:hidden'
                min={1}
                max={5}
                step={1}
            />

            <div className='hidden h-full flex-col items-start justify-between max-lg:flex'>
                <div>
                    <h2 className='text-2xl font-semibold max-lg:text-lg'>
                        Букет півоній
                    </h2>
                    <div className='mt-1.5 flex items-center gap-x-2 text-sm text-muted max-lg:text-xs'>
                        <CircleCheck className='size-4' />В в наявності
                    </div>
                </div>
                <AddLetterModal className='hidden max-lg:flex' />
            </div>
            <div className='hidden items-center gap-x-4 max-lg:flex'>
                <span className='text-sm text-accent line-through'>2 300₴</span>
                <span className='text-2xl font-medium max-lg:text-base'>2 000₴</span>
            </div>
            <StepperInput
                className='hidden max-lg:flex'
                min={1}
                max={5}
                step={1}
            />
        </div>
    )
}
