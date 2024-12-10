'use client'

import { CheckCircle, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { addCartItem, removeCartItem } from '@/api/cart/cart'
import { addFavoritesItem, removeFavoritesItem } from '@/api/favorites/favorites'
import type { SingleVariantProduct } from '@/api/products/products.types'
import type { VariantSize } from '@/api/variants/variants.types'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

const productSize: Record<VariantSize, string> = {
    small: 'S',
    medium: 'M',
    large: 'L',
    extra_large: 'XL'
} as const

export const ProductCard = ({ product }: { product: SingleVariantProduct }) => {
    const { isAuth } = useAuth()

    const productContent = product.variant?.components
        ?.map((component) => component.key_crm_product.description)
        .join(', ')

    const queryClient = useQueryClient()
    const router = useRouter()

    const [isOverlayVisible, setIsOverlayVisible] = useState(false)
    const [inFavorites, setInFavorites] = useState(product.in_wish_list)
    const [inCart, setInCart] = useState(product.in_cart)

    const { mutate: addToCart, isLoading: isAddingToCart } = useMutation({
        mutationFn: addCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries('cart')
            router.refresh()
        }
    })

    const { mutate: removeFromCart, isLoading: isRemovingFromCart } = useMutation({
        mutationFn: removeCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries('cart')
            router.refresh()
        }
    })

    const { mutate: addToFavorites, isLoading: isAddingToFavorites } = useMutation({
        mutationFn: addFavoritesItem,
        onSuccess: () => {
            queryClient.invalidateQueries('favorites')
            router.refresh()
        }
    })

    const { mutate: removeFromFavorites, isLoading: isRemovingFromFavorites } =
        useMutation({
            mutationFn: removeFavoritesItem,
            onSuccess: () => {
                queryClient.invalidateQueries('favorites')
                router.refresh()
            }
        })

    const toggleAddToFavorites = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setInFavorites(!inFavorites)
        setIsOverlayVisible(true)

        if (!isAddingToFavorites && isAuth && !isRemovingFromFavorites) {
            if (inFavorites) {
                removeFromFavorites(product?.id)
            } else {
                addToFavorites({
                    product: product.variant?.id
                })
            }
        }
    }

    const toggleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsOverlayVisible(false)

        setInCart(!inCart)

        if (!isAddingToCart && isAuth && !isRemovingFromCart) {
            if (inCart) {
                removeFromCart(product.variant?.id)
            } else {
                addToCart({
                    variant: product.variant?.id,
                    amount: 1
                })
            }
        }
    }
    return (
        <Link
            href={`/flower/${product?.id}/${product?.variant?.id}`}
            prefetch>
            <article
                onMouseEnter={() => setIsOverlayVisible(true)}
                onMouseLeave={() => setIsOverlayVisible(false)}
                className='relative overflow-hidden rounded-3xl border bg-background'>
                {isAuth ? (
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
                    {product?.variant?.images[0] ? (
                        <Image
                            src={product?.variant?.images[0].image}
                            width={300}
                            height={200}
                            alt={product?.name}
                            className='h-52 object-cover max-md:h-40'
                        />
                    ) : null}
                    <div
                        className={cn(
                            'absolute inset-0 flex flex-col justify-between bg-primary/70 p-4 text-sm text-background transition-opacity max-md:text-xs',
                            isOverlayVisible ? 'opacity-100' : 'opacity-0'
                        )}>
                        <ul>
                            <li>Висота: {product?.variant?.height} см</li>
                            <li>Розмір: {productSize[product?.variant?.size]} </li>
                            <li>Ширина: {product?.variant?.diameter} см</li>
                        </ul>

                        <p>Склад букету: {productContent}</p>
                    </div>
                </div>

                <div className='flex flex-col p-4 pt-6 max-sm:pt-4'>
                    <h1 className='px-6 text-center font-medium max-md:text-sm'>
                        {product?.name}
                    </h1>

                    <div className='mt-6 px-6 text-center max-sm:mt-4'>
                        {/* <div className='text-accent line-through max-md:text-sm'>
                        {product?.variant?.price}₴
                    </div> */}
                        <div className='text-lg max-md:text-base'>
                            {product?.variant?.price} ₴
                        </div>
                    </div>

                    <Button
                        disabled={!isAuth}
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
        </Link>
    )
}
