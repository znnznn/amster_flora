'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

import delivery from '@/assets/images/home/flower.jpeg'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Section } from '@/components/ui/section'

export const Delivery = () => {
    const t = useTranslations('HomePage.Delivery')
    const [isDeliveryOpen, setIsDeliveryOpen] = useState(false)

    return (
        <Section className='flex items-start justify-between gap-x-10 max-lg:flex-col'>
            <div className='h-[270px] w-[360px] shrink-0 max-sm:hidden'>
                <Image
                    src={delivery}
                    alt={t('Title')}
                    className='size-full rounded-3xl object-cover object-top'
                />
            </div>

            <div className='max-lg:mt-10'>
                <h2 className='text-[28px] font-bold'>{t('Title')}</h2>
                {!isDeliveryOpen && (
                    <p className='mt-10 max-lg:mt-6'>{t('ClosedMessage')}</p>
                )}
                <Collapsible
                    open={isDeliveryOpen}
                    onOpenChange={setIsDeliveryOpen}
                >
                    <CollapsibleContent>
                        <ScrollArea className='mt-10 h-72 pr-2 max-lg:mt-6'>
                            {t
                                .raw('OpenMessages')
                                .map((message: string, index: number) => (
                                    <p
                                        key={index}
                                        className='mt-4'
                                    >
                                        {message}
                                    </p>
                                ))}

                            <ul className='mt-4 list-disc pl-10'>
                                {t
                                    .raw('Benefits')
                                    .map((benefit: string, index: number) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                            </ul>
                        </ScrollArea>
                    </CollapsibleContent>
                    <CollapsibleTrigger className='mt-4 flex w-full items-center justify-center text-center text-xl font-bold'>
                        {t('ExpandButton')}
                    </CollapsibleTrigger>
                </Collapsible>
            </div>
        </Section>
    )
}
