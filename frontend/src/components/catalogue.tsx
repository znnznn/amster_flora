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
            className={cn(' max-md:mt-16 max-lg:min-h-[640px] max-md:min-h-[540px] container', className)}>
            <h2 className='sr-only text-left text-2xl font-bold'>Каталог квітів</h2>

            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                    dragFree: true
                }}>
                <div className='flex h-[490px] max-lg:h-64 w-fit flex-col items-start justify-between rounded-3xl bg-primary max-lg:w-3/4 max-lg:mx-auto py-6 pl-6 pr-16 max-lg:p-4 max-lg:!pb-16 max-lg:relative max-sm:w-[90%]'>

                    <div className='relative flex w-fit items-center gap-x-4 pt-10 max-lg:absolute max-lg:right-32'>
                        <CarouselPrevious className='left-0 border-accent text-accent' />
                        <CarouselNext className='-right-24 border-accent text-accent' />
                    </div>
                    <Tabs
                        orientation='vertical'
                        defaultValue={activeTab}>
                        <TabsList className='flex flex-col items-start gap-y-2 bg-transparent p-0 h-full'>
                            <TabsTrigger
                                className='bg-transparent text-left text-2xl max-md:text-base text-accent/50 hover:text-background data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:hover:text-background'
                                value='promo'>
                                <DiamondPercent className='mr-2 !size-6' /> Акції
                            </TabsTrigger>

                            <TabsTrigger
                                className='bg-transparent text-left text-2xl max-md:text-base text-accent/50 hover:text-background data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:hover:text-background'
                                value='best-sellers'>
                                Бестселери
                            </TabsTrigger>
                            <TabsTrigger
                                className='bg-transparent text-left text-2xl max-md:text-base text-accent/50 hover:text-background data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:hover:text-background'
                                value='similar'>
                                Суміжні товари
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            className='absolute max-lg:-left-12 left-64 top-1/2 max-lg:top-56 max-md:top-52 max-lg:!-translate-y-0 z-10 max-w-[105%] -translate-y-1/2 max-lg:max-w-[220%]  max-sm:-left-4'
                            value='promo'>
                            <CarouselContent>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <CarouselItem
                                        key={index}
                                        className='basis-1/5 max-md:basis-1/4'>
                                        <ProductCard />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </TabsContent>
                        <TabsContent
                           className='absolute max-lg:-left-12 left-64 top-1/2 max-lg:top-56 max-md:top-52 max-lg:!-translate-y-0 z-10 max-w-[105%] -translate-y-1/2 max-lg:max-w-[220%]  max-sm:-left-4'
                            value='best-sellers'>
                            <CarouselContent>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <CarouselItem
                                        key={index}
                                     className='basis-1/5 max-md:basis-1/4'>
                                        <ProductCard />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </TabsContent>
                        <TabsContent
                           className='absolute max-lg:-left-12 left-64 top-1/2 max-lg:top-56 max-md:top-52 max-lg:!-translate-y-0 z-10 max-w-[105%] -translate-y-1/2 max-lg:max-w-[220%]  max-sm:-left-4'
                            value='similar'>
                            <CarouselContent>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <CarouselItem
                                        key={index}
                                     className='basis-1/5 max-md:basis-1/4'>
                                        <ProductCard />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </TabsContent>
                    </Tabs>

                    <Link className='block max-lg:ml-auto' href='/catalogue'>
                        <Button
                            className='group text-2xl max-md:text-base text-accent'
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
