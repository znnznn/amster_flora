'use client'

import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import bg2 from '@/assets/images/bg-2.jpg'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const ProductCard = () => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsFavorite(!isFavorite)
        setIsOverlayVisible(true)
    }
    return (
        <article
            onMouseEnter={() => setIsOverlayVisible(true)}
            onMouseLeave={() => setIsOverlayVisible(false)}
            className='relative overflow-hidden rounded-3xl border bg-background'>
            <button
                onClick={toggleFavorite}
                className={cn(
                    'group absolute right-4 top-4 z-10 p-1 transition-colors hover:text-accent',
                    isFavorite ? 'fill-accent text-accent' : 'text-primary'
                )}>
                <Heart
                    className={cn(
                        'size-5 group-hover:fill-accent',
                        isFavorite ? 'fill-accent' : ''
                    )}
                />
            </button>
            <div className='relative overflow-hidden rounded-b-[22px]'>
                <Image
                    src={bg2}
                    alt='Калістегія махрова американська'
                    className='h-52 object-cover max-md:h-40'
                />
                <div
                    className={cn(
                        'absolute inset-0 flex flex-col justify-between bg-primary/70 p-4 text-sm text-background transition-opacity max-md:text-xs',
                        isOverlayVisible ? 'opacity-100' : 'opacity-0'
                    )}>
                    <ul>
                        <li>Висота: 50 см</li>
                        <li>Розмір: XL </li>
                        <li>Ширина: 50 см</li>
                    </ul>

                    <p>
                        Склад букету: протея, калла, роза, серрурия, гвоздика, эустома,
                        эвкалипт
                    </p>
                </div>
            </div>

            <div className='flex flex-col p-4 pt-6 max-sm:pt-4'>
                <h1 className='px-6 text-center font-medium max-md:text-sm'>
                    Калістегія махрова американська
                </h1>

                <div className='mt-6 px-6 text-center max-sm:mt-4'>
                    <div className='text-accent line-through max-md:text-sm'>2 600₴</div>
                    <div className='text-lg max-md:text-base'>2 300₴</div>
                </div>

                <Button
                    className='mx-auto mt-3 w-fit gap-x-2 border-b-[3px] border-r-[3px] border-primary max-md:w-full max-sm:mt-2'
                    size='lg'
                    variant='secondary'>
                    <span className='max-sm:hidden'> До кошика</span>
                    <ShoppingCart />
                </Button>
            </div>
        </article>
    )
}
