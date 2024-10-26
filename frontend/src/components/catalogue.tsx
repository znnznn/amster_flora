import { ArrowRight, DiamondPercent } from 'lucide-react'
import Link from 'next/link'

import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

type CatalogueProps = React.HTMLAttributes<HTMLDivElement>

export const Catalogue = ({ className }: CatalogueProps) => {
    return (
        <section
            className={cn(
                'overflow-hidden px-20 max-md:mt-16 max-md:px-16 max-sm:mt-10 max-sm:px-6',
                className
            )}>
            <h2 className='sr-only text-left text-[28px] font-bold'>Каталог квітів</h2>

            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                    dragFree: true
                }}>
                <div className='flex h-[490px] w-fit flex-col items-start justify-between rounded-[22px] bg-primary py-6 pl-6 pr-16'>
                    <div className='relative flex w-fit items-center gap-x-4 pt-10'>
                        <CarouselPrevious className='left-3 border-accent text-accent' />
                        <CarouselNext className='-right-24 border-accent text-accent' />
                    </div>
                    <ul className='space-y-2'>
                        <li>
                            <Link href='/promo'>
                                <Button
                                    className='text-[22px] text-accent'
                                    variant='link'>
                                    <DiamondPercent className='!size-6' /> Акції
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href='/promo'>
                                <Button
                                    className='text-[22px] text-accent'
                                    variant='link'>
                                    Бестселери
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href='/promo'>
                                <Button
                                    className='text-[22px] text-accent'
                                    variant='link'>
                                    Суміжні товари
                                </Button>
                            </Link>
                        </li>
                    </ul>

                    <Link href='/catalogue'>
                        <Button
                            className='group text-[22px] text-accent'
                            variant='link'>
                            До каталогу
                            <ArrowRight
                                className='!size-6 transition-transform group-hover:translate-x-2'
                                transition-transform
                            />
                        </Button>
                    </Link>
                </div>
                <div className='absolute left-64 top-1/2 z-10 max-w-[105%] -translate-y-1/2'>
                    <CarouselContent>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className='basis-1/5'>
                                <ProductCard />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </div>
            </Carousel>
        </section>
    )
}
