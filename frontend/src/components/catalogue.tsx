import { TabsContent } from '@radix-ui/react-tabs'
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface CatalogueProps extends React.HTMLAttributes<HTMLDivElement> {
    activeTab: 'promo' | 'best-sellers' | 'similar'
}

export const Catalogue = ({ className, activeTab }: CatalogueProps) => {
    return (
        <section
            className={cn(
                'overflow-hidden px-20 max-lg:px-16 max-md:mt-16 max-md:px-10 max-sm:mt-10 max-sm:px-3',
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
                        <CarouselPrevious className='left-0 border-accent text-accent' />
                        <CarouselNext className='-right-24 border-accent text-accent' />
                    </div>
                    <Tabs
                        orientation='vertical'
                        defaultValue={activeTab}>
                        <TabsList className='flex flex-col items-start gap-y-2 bg-transparent p-0'>
                            <TabsTrigger
                                className='bg-transparent text-left text-[22px] text-accent/50 hover:text-background data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:hover:text-background'
                                value='promo'>
                                <DiamondPercent className='mr-2 !size-6' /> Акції
                            </TabsTrigger>

                            <TabsTrigger
                                className='bg-transparent text-left text-[22px] text-accent/50 hover:text-background data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:hover:text-background'
                                value='best-sellers'>
                                Бестселери
                            </TabsTrigger>
                            <TabsTrigger
                                className='bg-transparent text-left text-[22px] text-accent/50 hover:text-background data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:hover:text-background'
                                value='similar'>
                                Суміжні товари
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            className='absolute left-64 top-1/2 z-10 max-w-[105%] -translate-y-1/2'
                            value='promo'>
                            <CarouselContent>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <CarouselItem
                                        key={index}
                                        className='basis-1/5'>
                                        <ProductCard />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </TabsContent>
                        <TabsContent
                            className='absolute left-64 top-1/2 z-10 max-w-[105%] -translate-y-1/2'
                            value='best-sellers'>
                            <CarouselContent>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <CarouselItem
                                        key={index}
                                        className='basis-1/5'>
                                        <ProductCard />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </TabsContent>
                        <TabsContent
                            className='absolute left-64 top-1/2 z-10 max-w-[105%] -translate-y-1/2'
                            value='similar'>
                            <CarouselContent>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <CarouselItem
                                        key={index}
                                        className='basis-1/5'>
                                        <ProductCard />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </TabsContent>
                    </Tabs>

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
            </Carousel>
        </section>
    )
}
