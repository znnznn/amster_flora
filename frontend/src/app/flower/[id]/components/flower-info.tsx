import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const FlowerInfo = () => {
    return (
        <Tabs
            defaultValue='composition'
            className='mt-12 h-40 px-20 max-lg:px-16 max-md:px-10 max-sm:px-3'>
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
