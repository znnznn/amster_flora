'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import flower from '@/assets/images/flower.jpg'
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface FlowerSliderProps {
    className?: string
    orientation?: 'horizontal' | 'vertical'
}

export const FlowerSlider = ({
    className,
    orientation = 'horizontal'
}: FlowerSliderProps) => {
    const [api, setApi] = useState<CarouselApi>()
    const [, setCurrent] = useState(0)
    const [, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const isVertical = orientation === 'vertical'

    return (
        <Carousel
            setApi={setApi}
            opts={{
                loop: true
            }}
            className={cn(
                'flex items-center justify-center',
                isVertical ? 'w-52 flex-col gap-y-4' : 'mt-4 flex-row gap-x-4',
                className
            )}
            orientation={orientation}>
            {isVertical ? (
                <CarouselPrevious className='static flex-shrink-0 translate-x-0 rotate-90' />
            ) : (
                <CarouselPrevious className='static flex-shrink-0 translate-y-0' />
            )}

            <CarouselContent
                className={cn(isVertical ? '-mt-1 h-[540px]' : '-ml-1 max-w-2xl')}>
                {[...Array(5)].map((_, index) => (
                    <CarouselItem
                        onClick={() => api?.scrollTo(index)}
                        key={index}
                        className={cn('basis-1/3 cursor-pointer')}>
                        <Image
                            src={flower}
                            alt={'Півонії'}
                            className={cn(
                                'aspect-video rounded-3xl object-cover',
                                isVertical ? 'h-40 w-full' : 'h-40 max-sm:h-24'
                            )}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

            {isVertical ? (
                <CarouselNext className='static flex-shrink-0 translate-x-0 rotate-90' />
            ) : (
                <CarouselNext className='static flex-shrink-0 translate-y-0' />
            )}
        </Carousel>
    )
}
