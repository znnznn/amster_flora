import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'

export const Faq = () => {
    return (
        <section className='mt-28 max-md:mt-16 container'>
            <h2 className='text-center text-[28px] font-bold max-md:text-lg'>
                Часті питання
            </h2>

            <Accordion
                className='mt-10'
                type='single'
                collapsible>
                <AccordionItem
                    className='px-6 transition-colors hover:bg-accent/40 max-sm:px-3'
                    value='item-1'>
                    <AccordionTrigger className='text-left max-md:text-base'>
                        Які квіти найкраще підходять для подарунка?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    className='px-6 transition-colors hover:bg-accent/40 max-sm:px-3'
                    value='item-2'>
                    <AccordionTrigger className='text-left max-md:text-base'>
                        Які квіти найкраще підходять для подарунка?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    className='px-6 transition-colors hover:bg-accent/40 max-sm:px-3'
                    value='item-3'>
                    <AccordionTrigger className='text-left max-md:text-base'>
                        Які квіти найкраще підходять для подарунка?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    className='px-6 transition-colors hover:bg-accent/40 max-sm:px-3'
                    value='item-4'>
                    <AccordionTrigger className='text-left max-md:text-base'>
                        Які квіти найкраще підходять для подарунка?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
