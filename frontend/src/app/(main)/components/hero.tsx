'use client'

import Autoplay from 'embla-carousel-autoplay'
import { Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import bg2 from '@/assets/images/bg-2.jpg'
import bg from '@/assets/images/bg.jpg'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export const Hero = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

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

    return (
        <section className='relative h-[750px]'>
            <SocialLinks />

            <Carousel
                setApi={setApi}
                opts={{
                    loop: true
                }}
                plugins={[
                    Autoplay({
                        delay: 10_000
                    })
                ]}
                className='h-[750px]'>
                <CarouselContent className='h-[750px]'>
                    <CarouselItem>
                        <div className='absolute bottom-20 left-40 max-w-96'>
                            <p className='text-lg font-medium text-primary'>
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum
                            </p>
                            <Button
                                size='lg'
                                className='mt-6 w-full'>
                                <Link href='/'>Замовити</Link>
                            </Button>
                        </div>
                        <Image
                            priority
                            src={bg}
                            alt='bg'
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            priority
                            src={bg2}
                            alt='bg'
                        />
                    </CarouselItem>
                </CarouselContent>

                <div className='absolute right-10 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center justify-center gap-y-2'>
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            className={cn(
                                'size-4 rounded-full border-2 border-accent transition-colors',
                                {
                                    'bg-accent': index + 1 === current
                                }
                            )}
                            onClick={() => api?.scrollTo(index)}></button>
                    ))}
                </div>
                <div className='absolute bottom-12 right-20'>
                    <CarouselPrevious className='text-accent' />
                    <CarouselNext className='text-accent' />
                </div>
            </Carousel>
        </section>
    )
}

const SocialLinks = () => {
    return (
        <ul className='absolute left-10 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-y-4 text-primary'>
            <li>
                <Link
                    className='transition-colors hover:text-accent'
                    href='tel:+3800687778893'>
                    <Facebook className='size-6' />
                </Link>
            </li>
            <li>
                <Link
                    className='transition-colors hover:text-accent'
                    href='tel:+3800687778893'>
                    <Instagram className='size-6' />
                </Link>
            </li>
            <li>
                <Link
                    className='rotate-180 font-medium transition-colors [writing-mode:vertical-rl] hover:text-accent'
                    href='tel:+3800687778893'>
                    +380 068 777 88 93
                </Link>
            </li>
        </ul>
    )
}
