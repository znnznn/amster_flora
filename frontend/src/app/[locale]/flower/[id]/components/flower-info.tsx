'use client'

import { CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { DiscountForm } from './discount-form'
import { FlowerCarousel } from './flower-carousel'
import { FlowerCarouselMobile } from './flower-carousel-mobile'
import type { Product } from '@/api/products/products-types'
import { AddLetterPopup } from '@/components/add-letter-popup'
import { ChooseGiftPopup } from '@/components/choose-gift-popup'
import { type ProductSize, ProductSizeToggle } from '@/components/product-size-toggle'
import { QuickOrder } from '@/components/quick-order'
import { ToCartButton } from '@/components/to-cart-button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Section } from '@/components/ui/section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface FlowerInfoProps {
    flower: Product
}

export const FlowerInfo = ({ flower }: FlowerInfoProps) => {
    const [flowerSize, setFlowerSize] = useState<ProductSize>('small')
    const t = useTranslations('FlowerPage')

    return (
        <>
            <FlowerCarouselMobile flower={flower} />
            <div className='mt-14 rounded-3xl bg-primary py-10 md:h-[640px]'>
                <div className='container flex items-center gap-10'>
                    <FlowerCarousel flower={flower} />
                    <div className='w-full space-y-10 text-accent'>
                        <h1 className='text-2xl font-semibold'>{flower.name}</h1>
                        <div className='flex items-center justify-between gap-3'>
                            <div className='flex items-center gap-2'>
                                <CheckCircle2 className='size-4' />
                                <span>в наявності</span>
                            </div>{' '}
                            <div className='text-xs'> Артикул: {flower.sku}</div>
                        </div>
                        <div className='text-xl font-medium'>
                            {flower.variants[0].price}₴
                        </div>
                        <div className='flex items-end justify-between gap-3'>
                            <div className='flex flex-col gap-2'>
                                <span>{t('size')}:</span>
                                <ProductSizeToggle
                                    value={flowerSize}
                                    onChange={setFlowerSize}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center gap-1'>
                                    <span>{t('height')}:</span>
                                    <span className='font-medium'>
                                        {flower.variants?.[0]?.height} см
                                    </span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <span>{t('diameter')}:</span>
                                    <span className='font-medium'>
                                        {flower.variants?.[0]?.diameter} см
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-3 max-sm:flex-col'>
                            <ChooseGiftPopup />
                            <AddLetterPopup />
                        </div>

                        <div className='flex items-center justify-between gap-3 max-sm:flex-col'>
                            <ToCartButton flower={flower} />
                            <QuickOrder />
                        </div>
                        <DiscountForm />
                    </div>
                </div>
            </div>
            <FlowerDescription flower={flower} />
        </>
    )
}

const FlowerDescription = ({ flower }: FlowerInfoProps) => {
    const t = useTranslations('FlowerPage')

    return (
        <Section className='lg:mt-14'>
            <Tabs
                className='max-md:hidden'
                defaultValue='content'
            >
                <TabsList className='h-10 bg-transparent'>
                    <TabsTrigger
                        className='rounded-none border-b border-primary/15 text-lg data-[state=active]:border-primary'
                        value='content'
                    >
                        {t('tabs.content')}
                    </TabsTrigger>
                    <TabsTrigger
                        className='rounded-none border-b border-primary/15 px-14 text-lg data-[state=active]:border-primary'
                        value='specs'
                    >
                        {t('tabs.specs')}
                    </TabsTrigger>
                    <TabsTrigger
                        className='rounded-none border-b border-primary/15 px-8 text-lg data-[state=active]:border-primary'
                        value='delivery'
                    >
                        {t('tabs.delivery')}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='content'>
                    <span className='font-medium'>{t('tabs.flowers')}: </span>
                    <span>
                        {flower.variants?.[0]?.components
                            ?.map((component) => component.key_crm_product.name)
                            .join(', ')}
                    </span>
                    <div>
                        <span className='font-medium'>{t('tabs.attention')}: </span>
                        {t('tabs.disclaimer')}
                    </div>
                </TabsContent>
                <TabsContent value='specs'>
                    {' '}
                    <span className='font-medium'>{t('tabs.flowers')}: </span>
                    <span>
                        {flower.variants?.[0]?.components
                            ?.map((component) => component.key_crm_product.name)
                            .join(', ')}
                    </span>
                    <div>
                        <span className='font-medium'>{t('tabs.attention')}: </span>
                        {t('tabs.disclaimer')}
                    </div>
                </TabsContent>
                <TabsContent value='delivery'>
                    {' '}
                    <span className='font-medium'>{t('tabs.flowers')}: </span>
                    <span>
                        {flower.variants?.[0]?.components
                            ?.map((component) => component.key_crm_product.name)
                            .join(', ')}
                    </span>
                    <div>
                        <span className='font-medium'>{t('tabs.attention')}: </span>
                        {t('tabs.disclaimer')}
                    </div>
                </TabsContent>
            </Tabs>
            <Accordion
                className='block md:hidden'
                type='single'
                defaultValue='content'
                collapsible
            >
                <AccordionItem value='content'>
                    <AccordionTrigger>{t('tabs.content')}</AccordionTrigger>
                    <AccordionContent>
                        <span className='font-medium'>{t('tabs.flowers')}: </span>
                        <span>
                            {flower.variants?.[0]?.components
                                ?.map((component) => component.key_crm_product.name)
                                .join(', ')}
                        </span>
                        <div>
                            <span className='font-medium'>{t('tabs.attention')}: </span>
                            {t('tabs.disclaimer')}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='specs'>
                    <AccordionTrigger>{t('tabs.specs')}</AccordionTrigger>
                    <AccordionContent>
                        <span className='font-medium'>{t('tabs.attention')}: </span>
                        {t('tabs.disclaimer')}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='delivery'>
                    <AccordionTrigger>{t('tabs.delivery')}</AccordionTrigger>
                    <AccordionContent>
                        <span className='font-medium'>{t('tabs.attention')}: </span>
                        {t('tabs.disclaimer')}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Section>
    )
}
