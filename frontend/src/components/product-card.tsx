'use client'

import Image from 'next/image'
import { useState } from 'react'

import { ToCartButton } from './to-cart-button'
import type { Product } from '@/api/products/products-types'
import productBg from '@/assets/images/home/bouqet.png'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link
            className='block'
            href='/'
        >
            <article
                className='w-[260px] overflow-clip rounded-3xl border'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className='relative overflow-clip rounded-b-3xl'>
                    <Image
                        src={productBg}
                        alt='product-bg'
                    />
                    <button
                        className='group absolute right-5 top-5 z-10'
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}
                    >
                        <svg
                            className={cn(
                                'text-primary transition-colors group-hover:fill-accent group-hover:text-accent',
                                product.in_wish_list ?? 'fill-accent text-accent'
                            )}
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M5.75 1.5C3.12665 1.5 1 3.75956 1 6.54688C1 12.125 10 18.5 10 18.5C10 18.5 19 12.125 19 6.54688C19 3.09375 16.8734 1.5 14.25 1.5C12.39 1.5 10.7796 2.63593 10 4.2905C9.22036 2.63593 7.61003 1.5 5.75 1.5Z'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </button>

                    <div
                        className={cn(
                            'absolute inset-0 flex flex-col justify-between gap-2 bg-primary/50 p-5 text-sm text-white',
                            'transition-all duration-300 ease-in-out',
                            isHovered ? 'opacity-100' : 'opacity-0'
                        )}
                    >
                        <ul>
                            <li>
                                Висота: <span>{product.variants[0]?.height || '-'}</span>{' '}
                                см
                            </li>
                            <li>
                                Розмір: <span>{product.variants[0]?.size || '-'}</span>
                            </li>
                            <li>
                                Ширина:{' '}
                                <span>{product.variants[0]?.diameter || '-'}</span> см
                            </li>
                        </ul>
                        <p>
                            Склад букету:{' '}
                            <span>
                                {product?.variants[0]?.components
                                    ?.map((component) => component?.key_crm_product?.name)
                                    .join(', ') || '-'}
                            </span>
                        </p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-between px-4 py-6'>
                    <h1 className='text-center font-medium'>{product.name}</h1>
                    <div className='mt-6 text-center'>
                        <span className='text-lg font-medium'>
                            {product.variants[0]?.price || '-'} ₴
                        </span>
                    </div>
                    <ToCartButton flower={product} />
                </div>
            </article>
        </Link>
    )
}
