import { useTranslations } from 'next-intl'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Section } from '@/components/ui/section'
import { H2 } from '@/components/ui/typography'

export const Faq = () => {
    const t = useTranslations('HomePage')
    return (
        <Section>
            <H2 className='text-center'>{t('faq.title')}</H2>

            <Accordion
                className='mt-10'
                type='single'
                collapsible
            >
                <AccordionItem value='item-1'>
                    <AccordionTrigger>{t('faq.item-1.title')}</AccordionTrigger>
                    <AccordionContent>{t('faq.item-1.title')}</AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                    <AccordionTrigger>{t('faq.item-2.title')}</AccordionTrigger>
                    <AccordionContent>{t('faq.item-2.title')}</AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                    <AccordionTrigger>{t('faq.item-3.title')}</AccordionTrigger>
                    <AccordionContent>{t('faq.item-3.title')}</AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-4'>
                    <AccordionTrigger>{t('faq.item-4.title')}</AccordionTrigger>
                    <AccordionContent>{t('faq.item-4.title')}</AccordionContent>
                </AccordionItem>
            </Accordion>
        </Section>
    )
}
