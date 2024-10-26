import Image from 'next/image'

import stories from '@/assets/images/stories.jpg'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const StoryPage = () => {
    return (
        <section className='mt-12 px-20 max-md:px-16 max-sm:mt-8 max-sm:px-6'>
            <Breadcrumb>
                <BreadcrumbList className='max-sm:justify-center'>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Головна</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Історія</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='mt-4 text-center text-[28px] font-semibold'>Історія</h1>

            <div className='mt-10 flex flex-col gap-y-14 max-md:mt-6 max-md:gap-y-8'>
                <div className='flex items-center gap-8 max-lg:flex-col max-md:gap-4'>
                    <Image
                        className='h-[374px] rounded-[33px] object-cover max-lg:h-72 max-md:h-64 max-sm:h-52'
                        src={stories}
                        alt='Історія'
                    />
                    <p className='text-lg max-md:text-base'>
                        У серці нашого міста, де кожен куточок має свою історію, народився
                        наш квітковий бізнес "Букет Мрій". Ідея створення цього особливого
                        місця, де краса природи поєднується з людськими емоціями, виникла
                        у 2010 році, коли наша засновниця, Олена Ковальчук, вирішила
                        змінити своє життя і слідувати своєму покликанню.
                    </p>
                </div>
                <div className='flex items-center gap-8 max-lg:flex-col-reverse max-md:gap-4'>
                    <p className='text-lg max-md:text-base'>
                        У серці нашого міста, де кожен куточок має свою історію, народився
                        наш квітковий бізнес "Букет Мрій". Ідея створення цього особливого
                        місця, де краса природи поєднується з людськими емоціями, виникла
                        у 2010 році, коли наша засновниця, Олена Ковальчук, вирішила
                        змінити своє життя і слідувати своєму покликанню.
                    </p>
                    <Image
                        className='h-[374px] rounded-[33px] object-cover max-lg:h-72 max-md:h-64 max-sm:h-52'
                        src={stories}
                        alt='Історія'
                    />
                </div>
                <div className='flex items-center gap-8 max-lg:flex-col max-md:gap-4'>
                    <Image
                        className='h-[374px] rounded-[33px] object-cover max-lg:h-72 max-md:h-64 max-sm:h-52'
                        src={stories}
                        alt='Історія'
                    />
                    <p className='text-lg max-md:text-base'>
                        У серці нашого міста, де кожен куточок має свою історію, народився
                        наш квітковий бізнес "Букет Мрій". Ідея створення цього особливого
                        місця, де краса природи поєднується з людськими емоціями, виникла
                        у 2010 році, коли наша засновниця, Олена Ковальчук, вирішила
                        змінити своє життя і слідувати своєму покликанню.
                    </p>
                </div>
                <div className='flex items-center gap-8 max-lg:flex-col-reverse max-md:gap-4'>
                    <p className='text-lg max-md:text-base'>
                        У серці нашого міста, де кожен куточок має свою історію, народився
                        наш квітковий бізнес "Букет Мрій". Ідея створення цього особливого
                        місця, де краса природи поєднується з людськими емоціями, виникла
                        у 2010 році, коли наша засновниця, Олена Ковальчук, вирішила
                        змінити своє життя і слідувати своєму покликанню.
                    </p>
                    <Image
                        className='h-[374px] rounded-[33px] object-cover max-lg:h-72 max-md:h-64 max-sm:h-52'
                        src={stories}
                        alt='Історія'
                    />
                </div>
            </div>
        </section>
    )
}

export default StoryPage
