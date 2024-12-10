'use client'

import { Check, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { editProduct } from '@/api/products/products'
import type { AddProductPayload, Product } from '@/api/products/products.types'
import { deleteVariant, editVariant } from '@/api/variants/variants'
import type { AddVariantPayload, VariantSize } from '@/api/variants/variants.types'
import imagePlaceholder from '@/assets/images/image-placeholder.svg'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const productSize: Record<VariantSize, string> = {
    small: 'S',
    medium: 'M',
    large: 'L',
    extra_large: 'XL'
} as const

export const AdminProductCard = ({ product }: { product: Product }) => {
    const productContent = product.variants[0]?.components
        ?.map((component) => component.key_crm_product.description)
        .join(', ')

    const [isOverlayVisible, setIsOverlayVisible] = useState(false)

    return (
        <article
            onMouseEnter={() => setIsOverlayVisible(true)}
            onMouseLeave={() => setIsOverlayVisible(false)}
            className='relative overflow-hidden rounded-3xl border bg-background'>
            <DeleteVariantBtn product={product} />

            <Link
                href={`/flower/${product?.id}/${product?.variants[0]?.id}`}
                prefetch>
                <div className='relative overflow-hidden rounded-b-[22px]'>
                    {product?.variants[0]?.images[0] ? (
                        <Image
                            src={product?.variants[0]?.images[0].image}
                            width={300}
                            height={200}
                            alt={product?.name}
                            className='h-52 object-cover max-md:h-40'
                        />
                    ) : (
                        <Image
                            src={imagePlaceholder}
                            alt={product?.name}
                            className='h-52 object-cover max-md:h-40'
                        />
                    )}
                    <div
                        className={cn(
                            'absolute inset-0 flex flex-col justify-between bg-primary/70 p-4 text-sm text-background transition-opacity max-md:text-xs',
                            isOverlayVisible ? 'opacity-100' : 'opacity-0'
                        )}>
                        <ul>
                            <li>Висота: {product?.variants[0]?.height} см</li>
                            <li>Розмір: {productSize[product?.variants[0]?.size]} </li>
                            <li>Ширина: {product?.variants[0]?.diameter} см</li>
                        </ul>

                        <p>Склад букету: {productContent}</p>
                    </div>
                </div>

                <div className='flex flex-col p-4 pt-6 max-sm:pt-4'>
                    <h1 className='px-6 text-center font-medium max-md:text-sm'>
                        <NameInput product={product} />
                    </h1>

                    <div className='mt-6 px-6 text-center max-sm:mt-4'>
                        <PriceInput product={product} />
                    </div>

                    {/* <Button
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
                    </Button> */}
                </div>
            </Link>
        </article>
    )
}

const NameInput = ({ product }: { product: Product }) => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const [initialName, setInitialName] = useState(product.name)
    const [isFocused, setIsFocused] = useState(false)

    const mutation = useMutation({
        mutationFn: async (payload: Partial<AddProductPayload>) =>
            await editProduct(product.id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries('products')
            router.refresh()
        }
    })

    const onSubmit = (data: Partial<AddProductPayload>) => {
        mutation.mutate(data)
    }

    return (
        <div className='relative w-full'>
            <Input
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
                className={cn(
                    'h-8 border-none p-1 text-center transition-all duration-300',
                    isFocused ? 'pr-10' : 'w-full'
                )}
                value={initialName}
                onChange={(e) => setInitialName(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <Button
                size='icon'
                className={cn(
                    'absolute right-1 top-1/2 size-6 shrink-0 -translate-y-1/2 rounded-full transition-all duration-300',
                    isFocused ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                )}
                disabled={!initialName.trim()}
                onClick={(e) => {
                    e.preventDefault()
                    onSubmit({ name: initialName })
                }}>
                <Check className='size-3' />
            </Button>
        </div>
    )
}

const PriceInput = ({ product }: { product: Product }) => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const [initialPrice, setInitialPrice] = useState(product.variants[0]?.price)
    const [isFocused, setIsFocused] = useState(false)

    const mutation = useMutation({
        mutationFn: async (payload: Partial<AddVariantPayload>) =>
            await editVariant(product.variants[0]?.id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries('products')
            router.refresh()
        }
    })

    const onSubmit = (data: Partial<AddVariantPayload>) => {
        mutation.mutate(data)
    }

    return (
        <div className='relative w-full'>
            <div className='space-y-2'>
                <div className='relative'>
                    <Input
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}
                        className={cn(
                            'peer h-8 border-none p-1 text-center text-lg transition-all duration-300 max-md:text-base',
                            isFocused ? 'pr-10' : 'w-full'
                        )}
                        value={isFocused ? initialPrice : initialPrice + ' ₴'}
                        onChange={(e) => setInitialPrice(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder='0.00'
                        type='text'
                    />
                    <span
                        className={cn(
                            'pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50',
                            isFocused ? 'opacity-100' : 'opacity-0'
                        )}>
                        ₴
                    </span>
                </div>
            </div>
            <Button
                size='icon'
                className={cn(
                    'absolute right-1 top-1/2 size-6 shrink-0 -translate-y-1/2 rounded-full transition-all duration-300',
                    isFocused ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                )}
                disabled={!initialPrice.trim()}
                onClick={(e) => {
                    e.preventDefault()
                    onSubmit({ price: initialPrice })
                }}>
                <Check className='size-3' />
            </Button>
        </div>
    )
}

const DeleteVariantBtn = ({ product }: { product: Product }) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: deleteVariant,
        onSuccess: () => {
            queryClient.invalidateQueries('products')
            router.refresh()
        }
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size='icon'
                    disabled={mutation.isLoading}
                    variant='destructive'
                    className='absolute right-4 top-4 z-10 size-8'>
                    <Trash className='size-3' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Видалити варіант?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Відмінити</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            mutation.mutate(product.variants[0].id)
                        }}>
                        Видалити
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
