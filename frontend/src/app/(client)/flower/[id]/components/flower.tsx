'use client'

import { CircleCheck, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { FlowerInfo, FlowerInfoAccordion } from './flower-info'
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
            <div className='container'>
                <Image
                    src={flower}
                    alt={'Півоній'}
                    className='mx-auto mt-6 aspect-video w-[620px] rounded-3xl object-cover max-md:w-[500px] max-sm:w-96 lg:hidden'
                />
                <FlowerSlider className='lg:hidden' />
            </div>

            <div className='mt-8 h-[700px] rounded-3xl bg-primary py-8 text-accent max-lg:h-fit'>
                <div className='container flex h-full items-start gap-x-14 max-xl:justify-center max-sm:block'>
                    <FlowerSlider
                        orientation='vertical'
                        className='max-xl:hidden'
                    />
                    <Image
                        src={flower}
                        alt={'Півоній'}
                        className='h-full max-w-md rounded-3xl object-cover max-lg:hidden'
                    />
                    <div className='flex flex-col gap-y-10 max-md:gap-y-8'>
                        <h2 className='text-2xl font-semibold max-md:text-lg max-sm:hidden'>
                            Букет півоній
                        </h2>

                        <div className='flex items-center justify-between gap-x-4 text-sm max-md:text-xs'>
                            <div className='flex items-center gap-x-2'>
                                <CircleCheck className='size-5 max-md:size-4' />В
                                наявності
                            </div>
                            <span>Артикул: 0101-0012</span>
                        </div>

                        <div className='flex items-center gap-x-4 max-md:justify-center'>
                            <span className='text-accent/40 line-through max-md:text-sm'>
                                2 300₴
                            </span>
                            <span className='text-2xl font-medium max-md:text-lg'>
                                2 000₴
                            </span>
                        </div>

                        <div className='flex items-end justify-between gap-x-4 max-md:justify-center'>
                            <div>
                                <h3 className='font-medium'>Розмір:</h3>
                                <ToggleGroup
                                    defaultValue={size}
                                    onValueChange={setSize}
                                    className='mt-2 justify-start gap-2 max-md:flex-wrap'
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
                            <div className='max-md:text-sm'>
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

                        <div className='flex items-center justify-between gap-4 max-md:flex-col max-md:justify-center'>
                            <Button
                                size='lg'
                                variant='secondary'>
                                До кошика
                                <ShoppingCart className='ml-2 size-4' />
                            </Button>
                            <QuickOrderModal />
                        </div>
                        <div className='flex items-center justify-between gap-x-12 max-md:gap-x-6'>
                            <Input
                                className='w-60 border-b-accent max-md:w-full'
                                type='text'
                                variant='underline'
                                placeholder='Промокод/Дисконтна картка'
                            />
                            <Button
                                size='lg'
                                variant='outline'>
                                <span className='hidden sm:inline'>
                                    Застосувати знижку
                                </span>
                                <span className='sm:hidden'>Застосувати</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <FlowerInfo />
            <FlowerInfoAccordion />
        </>
    )
}
