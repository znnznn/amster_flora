'use client'

import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import type { Product } from '@/api/products/products.types'
import bg2 from '@/assets/images/bg-2.jpg'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const AdminProductCard = ({ product }: { product: Product }) => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)

    return (
        <article
            onMouseEnter={() => setIsOverlayVisible(true)}
            onMouseLeave={() => setIsOverlayVisible(false)}
            className='relative overflow-hidden rounded-3xl border bg-background'>
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
                        <li>Висота: {product.variants[0].height} см</li>
                        <li>Розмір: {product.variants[0].size} </li>
                        <li>Ширина: {product.variants[0].diameter} см</li>
                    </ul>

                    <p>
                        Склад букету: протея, калла, роза, серрурия, гвоздика, эустома,
                        эвкалипт
                    </p>
                </div>
            </div>

            <div className='flex flex-col p-4 pt-6 max-sm:pt-4'>
                <h1 className='px-6 text-center font-medium max-md:text-sm'>
                    {product.name}
                </h1>

                <div className='mt-6 px-6 text-center max-sm:mt-4'>
                    {/* <div className='text-accent line-through max-md:text-sm'>
                        {product.variants[0].price}₴
                    </div> */}
                    <div className='text-lg max-md:text-base'>
                        {product.variants[0].price} ₴
                    </div>
                </div>

                <Button
                    className={cn(
                        'mx-auto mt-3 w-full gap-x-2 border-b-[3px] border-r-[3px] max-md:w-full max-sm:mt-2'
                    )}
                    size='lg'
                    variant='secondary'>
                    <span className='max-sm:hidden'>Додати в кошик</span>
                    <ShoppingCart />
                </Button>
            </div>
        </article>
    )
}
