'use client'

import { CircleCheck, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { FlowerInfo } from './flower-info'
import { FlowerSlider } from './flower-slider'
import { AddGiftModal } from './modals/add-gift'
import { AddLetterModal } from './modals/add-letter'
import { QuickOrderModal } from './modals/quick-order'
import flower from '@/assets/images/flower.jpg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const Flower = () => {
    const [size, setSize] = useState('m')

    return (
        <>
            <div className='mt-8 flex h-[700px] w-full items-start gap-x-14 rounded-[22px] bg-primary px-20 py-8 text-accent max-lg:px-16'>
                <FlowerSlider />
                <Image
                    src={flower}
                    alt={'Півоній'}
                    className='h-full rounded-[22px] object-cover'
                />
                <div className='flex flex-col gap-y-11'>
                    <h2 className='text-[28px] font-semibold'>Букет півоній</h2>

                    <div className='flex items-center justify-between gap-x-4'>
                        <div className='flex items-center gap-x-2'>
                            <CircleCheck className='size-5' />В наявності
                        </div>
                        <span className='text-sm'>Артикул: 0101-0012</span>
                    </div>

                    <div className='flex items-center gap-x-4'>
                        <span className='text-accent/40 line-through'>2 300₴</span>
                        <span className='text-[22px] font-medium'>2 000₴</span>
                    </div>

                    <div className='flex items-end justify-between gap-x-4'>
                        <div>
                            <h3 className='font-medium'>Розмір:</h3>
                            <ToggleGroup
                                defaultValue={size}
                                onValueChange={setSize}
                                className='mt-2 justify-start gap-x-2'
                                type='single'>
                                <ToggleGroupItem
                                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                                    value='s'>
                                    S
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                                    value='m'>
                                    M
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                                    value='l'>
                                    L
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                                    value='xl'>
                                    XL
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                        <div>
                            <div>
                                Висота: <span className='font-medium'>35 см</span>
                            </div>
                            <div>
                                Діаметр: <span className='font-medium'>35 см</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-between gap-x-4'>
                        <AddGiftModal />
                        <AddLetterModal />
                    </div>

                    <div className='flex items-center justify-between gap-x-4'>
                        <Button
                            size='lg'
                            variant='secondary'>
                            До кошика
                            <ShoppingCart className='ml-2 size-4' />
                        </Button>
                        <QuickOrderModal />
                    </div>
                    <div className='flex items-center justify-between gap-x-12'>
                        <Input
                            className='w-60'
                            type='text'
                            placeholder='Промокод/Дисконтна картка'
                        />
                        <Button
                            size='lg'
                            variant='outline'>
                            Застосувати знижку
                        </Button>
                    </div>
                </div>
            </div>
            <FlowerInfo />
        </>
    )
}
