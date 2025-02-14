'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { ProductsList } from './categories-list'
import { useProducts } from '@/api/products'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'

export const CategoriesPopup = () => {
    const t = useTranslations('Common.HeaderNav')

    const {
        productsQuery: { data: products }
    } = useProducts({})

    const [open, setOpen] = useState(false)

    return (
        <Sheet
            onOpenChange={setOpen}
            open={open}
        >
            <SheetTrigger className='rounded-md px-3.5 py-2 text-lg font-medium text-accent ring-offset-2 hover:text-background focus-visible:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2'>
                {t('Bouquets')}
            </SheetTrigger>
            <SheetContent
                side='top'
                className='top-[calc(var(--header-top-height)+var(--header-height))] z-40 border-x-0 border-b-0 border-t'
                overlayClassName='z-40'
                closeBtnClassName='hidden'
            >
                <SheetHeader>
                    <SheetTitle className='sr-only'>{t('Bouquets')}</SheetTitle>
                </SheetHeader>
                <ProductsList
                    onLinkClick={() => setOpen(false)}
                    products={products?.results ?? []}
                />
            </SheetContent>
        </Sheet>
    )
}
