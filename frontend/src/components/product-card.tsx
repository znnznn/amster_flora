'use client'

import { CheckCircle, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { addCartItem } from '@/api/cart/cart'
import { addFavoritesItem } from '@/api/favorites/favorites'
import type { Product } from '@/api/products/products.types'
import bg2 from '@/assets/images/bg-2.jpg'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

export const ProductCard = ({ product }: { product: Product }) => {
    const { user, isAuthenticated } = useAuth()

    const queryClient = useQueryClient()
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)
    const [inFavorites, setInFavorites] = useState(false)
    const [inCart, setInCart] = useState(false)

    const { mutate: addToCart, isLoading: isAddingToCart } = useMutation({
        mutationFn: addCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries('cart')
        }
    })

    const { mutate: addToFavorites, isLoading: isAddingToFavorites } = useMutation({
        mutationFn: addFavoritesItem,
        onSuccess: () => {
            queryClient.invalidateQueries('favorites')
        }
    })

    const toggleAddToFavorites = (e: React.MouseEvent) => {
        e.stopPropagation()
        setInFavorites(!inFavorites)
        setIsOverlayVisible(true)

        if (!inFavorites && !isAddingToFavorites && isAuthenticated) {
            addToFavorites({
                creator: user?.id!,
                product: product.id
            })
        }
    }

    const toggleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsOverlayVisible(false)

        setInCart(!inCart)

        if (!inCart && !isAddingToCart && isAuthenticated) {
            addToCart({
                variant: product.id,
                amount: 1
            })
        }
    }
    return (
        <article
            onMouseEnter={() => setIsOverlayVisible(true)}
            onMouseLeave={() => setIsOverlayVisible(false)}
            className='relative overflow-hidden rounded-3xl border bg-background'>
            {isAuthenticated ? (
                <button
                    onClick={toggleAddToFavorites}
                    className={cn(
                        'group absolute right-4 top-4 z-10 p-1 transition-colors hover:text-accent',
                        inFavorites ? 'fill-accent text-accent' : 'text-primary'
                    )}>
                    <Heart
                        className={cn(
                            'size-5 group-hover:fill-accent',
                            inFavorites ? 'fill-accent' : ''
                        )}
                    />
                </button>
            ) : null}
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
                    disabled={!isAuthenticated}
                    onClick={toggleAddToCart}
                    className={cn(
                        'mx-auto mt-3 w-full gap-x-2 border-b-[3px] border-r-[3px] max-md:w-full max-sm:mt-2',

                        inCart
                            ? 'border-accent bg-primary text-accent hover:border-primary hover:bg-accent hover:text-primary'
                            : 'border-primary bg-accent text-primary hover:border-accent hover:bg-primary hover:text-accent'
                    )}
                    size='lg'
                    variant='secondary'>
                    <span className='max-sm:hidden'>
                        {inCart ? 'Вже в кошику' : 'Додати в кошик'}
                    </span>
                    {inCart ? <CheckCircle /> : <ShoppingCart />}
                </Button>
            </div>
        </article>
    )
}
