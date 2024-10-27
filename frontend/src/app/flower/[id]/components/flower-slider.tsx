import Image from 'next/image'

import flower from '@/assets/images/flower.jpg'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'

export const FlowerSlider = () => {
    return (
        <Carousel
            opts={{
                loop: true
            }}
            className='flex w-52 flex-col items-center justify-center gap-y-4'
            orientation='vertical'>
            <CarouselPrevious className='static translate-x-0' />

            <CarouselContent className='-mt-1 h-[540px]'>
                <CarouselItem className='basis-1/3'>
                    <Image
                        src={flower}
                        alt={'Півоній'}
                        className='h-40 rounded-[22px] object-cover'
                    />
                </CarouselItem>
                <CarouselItem className='basis-1/3'>
                    <Image
                        src={flower}
                        alt={'Півоній'}
                        className='h-40 rounded-[22px] object-cover'
                    />
                </CarouselItem>
                <CarouselItem className='basis-1/3'>
                    <Image
                        src={flower}
                        alt={'Півоній'}
                        className='h-40 rounded-[22px] object-cover'
                    />
                </CarouselItem>
                <CarouselItem className='basis-1/3'>
                    <Image
                        src={flower}
                        alt={'Півоній'}
                        className='h-40 rounded-[22px] object-cover'
                    />
                </CarouselItem>
            </CarouselContent>
            <CarouselNext className='static translate-x-0' />
        </Carousel>
    )
}
