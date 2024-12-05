import { CircleCheck } from 'lucide-react'
import Image from 'next/image'

import { StepperInput } from './stepper-input'
import flower from '@/assets/images/flower.jpg'
import { AddLetterModal } from '@/components/add-letter'

export const CartProduct = () => {
    return (
        <>
            <div className='hidden h-[185px] items-center gap-x-6 rounded-2xl border p-4 max-xl:gap-x-4 md:flex'>
                <Image
                    src={flower}
                    alt='Півоній'
                    className='h-full w-44 rounded-xl object-cover'
                />
                <div className='flex min-h-full flex-1 items-center justify-between gap-x-8 max-xl:gap-x-6'>
                    <div className='flex min-h-full flex-col items-start justify-between gap-y-4'>
                        <div>
                            <h2 className='text-2xl font-semibold max-lg:text-lg'>
                                Букет півоній
                            </h2>
                            <div className='mt-1.5 flex items-center gap-x-2 text-xs text-muted lg:text-sm'>
                                <CircleCheck className='size-4' />В в наявності
                            </div>
                        </div>
                        <AddLetterModal />
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <span className='whitespace-nowrap text-sm text-accent line-through'>
                            2 300₴
                        </span>
                        <span className='whitespace-nowrap text-base font-medium lg:text-xl'>
                            2 000₴
                        </span>
                    </div>
                    <StepperInput
                        min={1}
                        max={5211}
                        step={1}
                    />
                </div>
            </div>
            <MobileCartProduct />
        </>
    )
}

const MobileCartProduct = () => {
    return (
        <div className='mx-auto flex max-w-lg flex-col items-center gap-y-4 rounded-2xl border p-3 max-sm:p-2 md:hidden'>
            <div className='flex w-full items-center justify-between gap-x-6 max-md:justify-start'>
                <Image
                    src={flower}
                    alt='Півоній'
                    className='aspect-square w-48 rounded-xl object-cover max-md:w-full max-sm:w-44'
                />
                <div className='flex h-full flex-col items-start justify-between gap-y-4 max-md:w-full'>
                    <div>
                        <h2 className='text-lg font-semibold lg:text-2xl'>
                            Букет півоній
                        </h2>
                        <div className='mt-1.5 flex items-center gap-x-2 text-xs text-muted lg:text-sm'>
                            <CircleCheck className='size-4' />В в наявності
                        </div>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <span className='whitespace-nowrap text-sm text-accent line-through'>
                            2 300₴
                        </span>
                        <span className='whitespace-nowrap text-base font-medium lg:text-2xl'>
                            2 000₴
                        </span>
                    </div>
                    <StepperInput
                        min={1}
                        max={52}
                        step={1}
                    />
                </div>
            </div>
            <AddLetterModal />
        </div>
    )
}
