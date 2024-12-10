'use client'

import { CheckCircle, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { FlowerInfo, FlowerInfoAccordion } from './flower-info'
import { FlowerSlider } from './flower-slider'
import { AddGiftModal } from './modals/add-gift'
import { AddLetterModal } from './modals/add-letter'
import { QuickOrderModal } from './modals/quick-order'
import { addCartItem, removeCartItem } from '@/api/cart/cart'
import type { SingleVariantProduct } from '@/api/products/products.types'
import type { VariantSize } from '@/api/variants/variants.types'
import imagePlaceholder from '@/assets/images/image-placeholder.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

export const Flower = ({ product }: { product: SingleVariantProduct }) => {
    const queryClient = useQueryClient()

    const router = useRouter()

    const { isAuth } = useAuth()

    const isDiscount = false

    const [size, setSize] = useState(product.variant.size)

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

    const toggleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

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
        <>
            <div className='container'>
                {product?.variant?.images[0] ? (
                    <Image
                        src={product?.variant?.images[0].image}
                        width={300}
                        height={200}
                        alt={product?.name}
                        className='mx-auto mt-6 aspect-video w-[620px] rounded-3xl object-cover max-md:w-[500px] max-sm:w-96 lg:hidden'
                    />
                ) : (
                    <Image
                        src={imagePlaceholder}
                        alt={product?.name}
                        className='mx-auto mt-6 aspect-video w-[620px] rounded-3xl object-cover max-md:w-[500px] max-sm:w-96 lg:hidden'
                    />
                )}
                {/* <Image
                    src={flower}
                    alt={'Півоній'}
                    className='mx-auto mt-6 aspect-video w-[620px] rounded-3xl object-cover max-md:w-[500px] max-sm:w-96 lg:hidden'
                /> */}
                {/* <FlowerSlider
                    images={product.variant.images}
                    className='lg:hidden'
                /> */}
            </div>

            <div className='mt-8 h-[700px] rounded-3xl bg-primary py-8 text-accent max-lg:h-fit'>
                <div className='container flex h-full items-start gap-x-14 max-xl:justify-center max-sm:block'>
                    <FlowerSlider
                        images={product.variant.images}
                        orientation='vertical'
                        className='max-xl:hidden'
                    />

                    {product?.variant?.images[0] ? (
                        <Image
                            src={product?.variant?.images[0].image}
                            width={300}
                            height={200}
                            alt={product?.name}
                            className='h-full w-[470px] max-w-lg rounded-3xl object-cover max-lg:hidden'
                        />
                    ) : (
                        <Image
                            src={imagePlaceholder}
                            alt={product?.name}
                            className='h-full max-w-md rounded-3xl object-cover max-lg:hidden'
                        />
                    )}

                    <div className='flex flex-col gap-y-10 max-md:gap-y-8'>
                        <h2 className='text-2xl font-semibold max-md:text-lg max-sm:hidden'>
                            Букет півоній
                        </h2>

                        <div className='flex items-center justify-between gap-x-4 text-sm max-md:text-xs'>
                            {/* <div className='flex items-center gap-x-2'>
                                <CircleCheck className='size-5 max-md:size-4' />В
                                наявності
                            </div> */}
                            <span>Артикул: {product.sku}</span>
                        </div>

                        <div className='flex items-center gap-x-4 max-md:justify-center'>
                            <span
                                className={cn(
                                    'max-md:text-sm',
                                    isDiscount
                                        ? 'text-base text-accent/40 line-through'
                                        : 'text-2xl text-accent'
                                )}>
                                {product.variant.price} ₴
                            </span>
                            {isDiscount ? (
                                <span className='text-2xl font-medium max-md:text-lg'>
                                    2 000₴
                                </span>
                            ) : null}
                        </div>

                        <div className='flex items-end justify-between gap-x-4 max-md:justify-center'>
                            <div>
                                <h3 className='font-medium'>Розмір:</h3>
                                <ToggleGroup
                                    defaultValue={size}
                                    onValueChange={(value) =>
                                        setSize(value as VariantSize)
                                    }
                                    className='mt-2 justify-start gap-2 max-md:flex-wrap'
                                    type='single'>
                                    <ToggleGroupItem
                                        className='size-11 bg-accent/40 text-lg font-medium text-accent'
                                        value='small'>
                                        S
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                        className='size-11 bg-accent/40 text-lg font-medium text-accent'
                                        value='medium'>
                                        M
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                        className='size-11 bg-accent/40 text-lg font-medium text-accent'
                                        value='large'>
                                        L
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                        className='size-11 bg-accent/40 text-lg font-medium text-accent'
                                        value='extra_large'>
                                        XL
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                            <div className='font-medium max-md:text-sm'>
                                <div>
                                    Висота: <span>{product.variant.height} см</span>
                                </div>
                                <div>
                                    Діаметр: <span>{product.variant.diameter} см</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-between gap-x-4'>
                            <AddGiftModal />
                            <AddLetterModal />
                        </div>

                        <div className='flex items-center justify-between gap-4 max-md:flex-col max-md:justify-center'>
                            <Button
                                onClick={toggleAddToCart}
                                disabled={!isAuth || isAddingToCart || isRemovingFromCart}
                                size='lg'
                                className={cn(
                                    'mx-auto mt-3 w-full gap-x-2 border-b-[3px] border-r-[3px] border-primary max-md:w-full max-sm:mt-2'
                                )}
                                variant='secondary'>
                                <span className='max-sm:hidden'>
                                    {inCart ? 'Вже в кошику' : 'Додати в кошик'}
                                </span>
                                {inCart ? <CheckCircle /> : <ShoppingCart />}
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
