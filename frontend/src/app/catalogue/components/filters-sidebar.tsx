'use client'

import { AvailabilityFilter } from './filters/availability'
import { ColorFilter } from './filters/color'
import { FlowerFilter } from './filters/flower'
import { PriceFilter } from './filters/price'
import { SizeFilter } from './filters/size'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'

export const FiltersSidebar = () => {
    return (
        <div className='h-[640px] min-w-80 rounded-r-[22px] bg-primary px-10 py-8 text-accent'>
            <Accordion type='multiple'>
                <AccordionItem
                    className='border-none'
                    value='flower'>
                    <AccordionTrigger className='py-0'>
                        <h3 className='text-[22px] font-medium text-accent'>Квітка</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <FlowerFilter />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    className='border-none'
                    value='availability'>
                    <AccordionTrigger className='pb-0 pt-6'>
                        <h3 className='text-[22px] font-medium text-accent'>Наявність</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <AvailabilityFilter />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    className='border-none'
                    value='color'>
                    <AccordionTrigger className='pb-0 pt-6'>
                        <h3 className='text-[22px] font-medium text-accent'>Колір</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ColorFilter />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className='mt-6 flex flex-col gap-y-6'>
                <SizeFilter />
                <PriceFilter />
            </div>
        </div>
    )
}
