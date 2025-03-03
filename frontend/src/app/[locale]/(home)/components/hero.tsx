'use client'

import { Facebook, Instagram } from 'lucide-react'
import { useEffect, useState } from 'react'

import heroBg from '@/assets/images/home/hero-bg.png'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import { Link } from '@/i18n/routing'
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
        <section className='relative h-[600px] bg-muted lg:h-[750px]'>
            <h1 className='sr-only'>Amster Flora</h1>

            <div className='container pointer-events-none absolute inset-0 z-10'>
                <div className='relative h-full w-full'>
                    <ul className='pointer-events-auto absolute left-0 top-12 flex flex-col gap-y-4 text-primary md:top-1/2 md:-translate-y-1/2'>
                        <li>
                            <Link
                                className='transition-colors hover:text-accent'
                                href='tel:+3800687778893'
                            >
                                <Facebook className='size-6' />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='transition-colors hover:text-accent'
                                href='tel:+3800687778893'
                            >
                                <Instagram className='size-6' />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='rotate-180 font-medium transition-colors [writing-mode:vertical-rl] hover:text-accent'
                                href='tel:+3800687778893'
                            >
                                +380 068 777 88 93
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <Carousel
                setApi={setApi}
                className='relative'
            >
                <CarouselContent>
                    <CarouselItem
                        className='flex h-[600px] flex-col justify-end bg-cover bg-center bg-no-repeat lg:h-[750px]'
                        style={{
                            backgroundImage: `url(${heroBg.src})`
                        }}
                    >
                        <div className='container py-12 max-md:pb-24'>
                            <div className='max-w-[400px]'>
                                <p className='text-white md:text-primary'>
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum{' '}
                                </p>
                                <Link href='/catalogue'>
                                    <Button className='mt-6 w-full max-md:bg-accent max-md:text-accent-foreground max-md:hover:bg-accent/80'>
                                        Замовити
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem
                        className='flex h-[600px] flex-col justify-end bg-cover bg-center bg-no-repeat lg:h-[750px]'
                        style={{
                            backgroundImage: `url(${heroBg.src})`
                        }}
                    >
                        <div className='container py-12 max-md:pb-24'>
                            <div className='max-w-[400px]'>
                                <p className='text-white md:text-primary'>
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum{' '}
                                </p>
                                <Link href='/catalogue'>
                                    <Button className='mt-6 w-full max-md:bg-accent max-md:text-accent-foreground max-md:hover:bg-accent/80'>
                                        Замовити
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>

                <div className='container absolute inset-0'>
                    <div className='relative h-full w-full'>
                        {/* Controls - positioned at the right side of container */}
                        <div className='absolute bottom-6 right-0 z-10 flex items-center justify-center gap-x-4 md:bottom-12'>
                            <CarouselPrevious className='static translate-y-0' />
                            <CarouselNext className='static translate-y-0' />
                        </div>

                        <div className='absolute right-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center justify-center gap-y-2'>
                            {Array.from({ length: count }).map((_, index) => (
                                <button
                                    key={index}
                                    className={cn(
                                        'size-4 rounded-full border-accent transition-colors',
                                        {
                                            'bg-accent': index + 1 === current
                                        }
                                    )}
                                    onClick={() => api?.scrollTo(index)}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </Carousel>
        </section>
    )
}
