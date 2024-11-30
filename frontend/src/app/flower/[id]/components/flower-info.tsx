import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const FlowerInfo = () => {
    return (
        <Tabs
            defaultValue='composition'
            className='container mt-12 max-md:hidden'>
            <TabsList className='bg-transparent'>
                <TabsTrigger
                    className='rounded-none border-b bg-transparent px-8 text-lg !shadow-none data-[state=active]:border-b-primary'
                    value='composition'>
                    Склад
                </TabsTrigger>
                <TabsTrigger
                    className='rounded-none border-b bg-transparent px-8 text-lg !shadow-none data-[state=active]:border-b-primary'
                    value='specs'>
                    Характеристики
                </TabsTrigger>
                <TabsTrigger
                    className='rounded-none border-b bg-transparent px-8 text-lg !shadow-none data-[state=active]:border-b-primary'
                    value='payment-and-delivery'>
                    Доставка і оплата
                </TabsTrigger>
            </TabsList>
            <TabsContent
                className='text-lg'
                value='composition'>
                <p>
                    <span className='font-medium'>Квіти:</span>гортензія, троянда,
                    орнітогалум, еустома, клематис, астранція
                </p>
                <p>
                    <span className='font-medium'>Декоративні матеріали: </span>
                    флористичний пакувальний папір, стрічка
                </p>
                <p className='mt-4'>
                    <span className='font-medium'>Увага:</span>
                    букет зовні може відрізнятися від зображення на сайті, склад
                    залишається без змін.
                </p>
            </TabsContent>
            <TabsContent
                className='text-lg'
                value='specs'>
                <p>
                    <span className='font-medium'>Квіти:</span>гортензія, троянда,
                    орнітогалум, еустома, клематис, астранція
                </p>
                <p>
                    <span className='font-medium'>Декоративні матеріали: </span>
                    флористичний пакувальний папір, стрічка
                </p>
            </TabsContent>
            <TabsContent
                className='text-lg'
                value='payment-and-delivery'>
                <p>
                    <span className='font-medium'>Квіти:</span>гортензія, троянда,
                    орнітогалум, еустома, клематис, астранція
                </p>

                <p className='mt-4'>
                    <span className='font-medium'>Увага:</span>
                    букет зовні може відрізнятися від зображення на сайті, склад
                    залишається без змін.
                </p>
            </TabsContent>
        </Tabs>
    )
}

export const FlowerInfoAccordion = () => {
    return (
        <Accordion
            type='single'
            collapsible
            className='container mt-8 hidden max-md:block'>
            <AccordionItem value='composition'>
                <AccordionTrigger className='text-lg font-medium'>Склад</AccordionTrigger>
                <AccordionContent className='text-lg'>
                    <p>
                        <span className='font-medium'>Квіти: </span>
                        гортензія, троянда, орнітогалум, еустома, клематис, астранція
                    </p>
                    <p>
                        <span className='font-medium'>Декоративні матеріали: </span>
                        флористичний пакувальний папір, стрічка
                    </p>
                    <p className='mt-4'>
                        <span className='font-medium'>Увага: </span>
                        букет зовні може відрізнятися від зображення на сайті, склад
                        залишається без змін.
                    </p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value='specs'>
                <AccordionTrigger className='text-lg font-medium'>
                    Характеристики
                </AccordionTrigger>
                <AccordionContent className='text-lg'>
                    <p>
                        <span className='font-medium'>Квіти: </span>
                        гортензія, троянда, орнітогалум, еустома, клематис, астранція
                    </p>
                    <p>
                        <span className='font-medium'>Декоративні матеріали: </span>
                        флористичний пакувальний папір, стрічка
                    </p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value='payment-and-delivery'>
                <AccordionTrigger className='text-lg font-medium'>
                    Доставка і оплата
                </AccordionTrigger>
                <AccordionContent className='text-lg'>
                    <p>
                        <span className='font-medium'>Квіти: </span>
                        гортензія, троянда, орнітогалум, еустома, клематис, астранція
                    </p>
                    <p className='mt-4'>
                        <span className='font-medium'>Увага: </span>
                        букет зовні може відрізнятися від зображення на сайті, склад
                        залишається без змін.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
