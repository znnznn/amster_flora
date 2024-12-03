import { TabsContent } from '@radix-ui/react-tabs'
import { ArrowRight, DiamondPercent } from 'lucide-react'
import Link from 'next/link'

import type { Product } from '@/api/products/products.types'
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

export const products: Product[] = [
    {
        id: 10,
        name: 'Item 0',
        sku: 'SKU-0',
        description: 'Description for item 0',
        category: 0,
        shop: 0,
        variants: [
            {
                id: 0,
                size: 'small',
                height: 32767,
                diameter: 32767,
                hex_color: '#FF0000',
                quantity: 2147483647,
                price: '10.00',
                image: 'http://example.com/image0.jpg',
                images: [
                    {
                        id: 0,
                        image: 'http://example.com/image0_1.jpg',
                        variant: 0
                    }
                ],
                components: [
                    {
                        id: 0,
                        key_crm_product: 0,
                        quantity: 2147483647
                    }
                ]
            }
        ] as any
    },
    {
        id: 0,
        name: 'Item 0',
        sku: 'SKU-0',
        description: 'Description for item 0',
        category: 0,
        shop: 0,
        variants: [
            {
                id: 0,
                size: 'small',
                height: 32767,
                diameter: 32767,
                hex_color: '#FF0000',
                quantity: 2147483647,
                price: '10.00',
                image: 'http://example.com/image0.jpg',
                images: [
                    {
                        id: 0,
                        image: 'http://example.com/image0_1.jpg',
                        variant: 0
                    }
                ],
                components: [
                    {
                        id: 0,
                        key_crm_product: 0,
                        quantity: 2147483647
                    }
                ]
            }
        ] as any
    },
    {
        id: 1,
        name: 'Item 1',
        sku: 'SKU-1',
        description: 'Description for item 1',
        category: 0,
        shop: 0,
        variants: [
            {
                id: 1,
                size: 'medium',
                height: 32767,
                diameter: 32767,
                hex_color: '#00FF00',
                quantity: 2147483647,
                price: '15.00',
                image: 'http://example.com/image1.jpg',
                images: [
                    {
                        id: 1,
                        image: 'http://example.com/image1_1.jpg',
                        variant: 1
                    }
                ],
                components: [
                    {
                        id: 1,
                        key_crm_product: 1,
                        quantity: 2147483647
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Item 2',
        sku: 'SKU-2',
        description: 'Description for item 2',
        category: 0,
        shop: 0,
        variants: [
            {
                id: 2,
                size: 'large',
                height: 32767,
                diameter: 32767,
                hex_color: '#0000FF',
                quantity: 2147483647,
                price: '20.00',
                image: 'http://example.com/image2.jpg',
                images: [
                    {
                        id: 2,
                        image: 'http://example.com/image2_1.jpg',
                        variant: 2
                    }
                ],
                components: [
                    {
                        id: 2,
                        key_crm_product: 2,
                        quantity: 2147483647
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Item 3',
        sku: 'SKU-3',
        description: 'Description for item 3',
        category: 0,
        shop: 0,
        variants: [
            {
                id: 3,
                size: 'x-large',
                height: 32767,
                diameter: 32767,
                hex_color: '#FFFF00',
                quantity: 2147483647,
                price: '25.00',
                image: 'http://example.com/image3.jpg',
                images: [
                    {
                        id: 3,
                        image: 'http://example.com/image3_1.jpg',
                        variant: 3
                    }
                ],
                components: [
                    {
                        id: 3,
                        key_crm_product: 3,
                        quantity: 2147483647
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        name: 'Item 4',
        sku: 'SKU-4',
        description: 'Description for item 4',
        category: 0,
        shop: 0,
        variants: [
            {
                id: 4,
                size: '2x-large',
                height: 32767,
                diameter: 32767,
                hex_color: '#FF00FF',
                quantity: 2147483647,
                price: '30.00',
                image: 'http://example.com/image4.jpg',
                images: [
                    {
                        id: 4,
                        image: 'http://example.com/image4_1.jpg',
                        variant: 4
                    }
                ],
                components: [
                    {
                        id: 4,
                        key_crm_product: 4,
                        quantity: 2147483647
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        name: 'Item 4',
        sku: 'SKU-4',
        description: 'Description for item 4',
        category: 0,
        shop: 0,
        variants: [
            {
                id: 4,
                size: '2x-large',
                height: 32767,
                diameter: 32767,
                hex_color: '#FF00FF',
                quantity: 2147483647,
                price: '30.00',
                image: 'http://example.com/image4.jpg',
                images: [
                    {
                        id: 4,
                        image: 'http://example.com/image4_1.jpg',
                        variant: 4
                    }
                ],
                components: [
                    {
                        id: 4,
                        key_crm_product: 4,
                        quantity: 2147483647
                    }
                ]
            }
        ]
    }
]

export const Catalogue = ({ className, activeTab }: CatalogueProps) => {
    return (
        <div className='overflow-x-clip'>
            <section
                className={cn(
                    'container max-lg:min-h-[640px] max-md:mt-16 max-md:min-h-[540px]',
                    className
                )}>
                <h2 className='sr-only text-left text-2xl font-bold'>Каталог квітів</h2>

                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                        dragFree: true
                    }}>
                    <div className='flex h-[490px] w-fit flex-col items-start justify-between rounded-3xl bg-primary py-6 pl-6 pr-16 max-lg:relative max-lg:mx-auto max-lg:h-64 max-lg:w-3/4 max-lg:p-4 max-lg:!pb-16 max-sm:w-[90%]'>
                        <div className='relative flex w-fit items-center gap-x-4 pt-10 max-lg:absolute max-lg:right-32'>
                            <CarouselPrevious className='left-0 border-accent text-accent' />
                            <CarouselNext className='-right-24 border-accent text-accent' />
                        </div>
                        <Tabs
                            orientation='vertical'
                            defaultValue={activeTab}>
                            <TabsList className='flex h-full flex-col items-start gap-y-2 bg-transparent p-0'>
                                <TabsTrigger
                                    className='bg-transparent text-left text-2xl text-accent/50 hover:text-background data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:hover:text-background max-md:text-base'
                                    value='promo'>
                                    <DiamondPercent className='mr-2 !size-6' /> Акції
                                </TabsTrigger>

                                <TabsTrigger
                                    className='bg-transparent text-left text-2xl text-accent/50 hover:text-background data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:hover:text-background max-md:text-base'
                                    value='best-sellers'>
                                    Бестселери
                                </TabsTrigger>
                                <TabsTrigger
                                    className='bg-transparent text-left text-2xl text-accent/50 hover:text-background data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:hover:text-background max-md:text-base'
                                    value='similar'>
                                    Суміжні товари
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                className='absolute left-64 top-1/2 z-10 max-w-[105%] -translate-y-1/2 max-lg:-left-12 max-lg:top-56 max-lg:max-w-[220%] max-lg:!-translate-y-0 max-md:top-52 max-sm:-left-4'
                                value='promo'>
                                <CarouselContent>
                                    {products.map((product) => (
                                        <CarouselItem
                                            key={product.id}
                                            className='basis-1/5 max-md:basis-1/4'>
                                            <ProductCard product={product} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </TabsContent>
                            <TabsContent
                                className='absolute left-64 top-1/2 z-10 max-w-[105%] -translate-y-1/2 max-lg:-left-12 max-lg:top-56 max-lg:max-w-[220%] max-lg:!-translate-y-0 max-md:top-52 max-sm:-left-4'
                                value='best-sellers'>
                                <CarouselContent>
                                    {products.map((product) => (
                                        <CarouselItem
                                            key={product.id}
                                            className='basis-1/5 max-md:basis-1/4'>
                                            <ProductCard product={product} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </TabsContent>
                            <TabsContent
                                className='absolute left-64 top-1/2 z-10 max-w-[105%] -translate-y-1/2 max-lg:-left-12 max-lg:top-56 max-lg:max-w-[220%] max-lg:!-translate-y-0 max-md:top-52 max-sm:-left-4'
                                value='similar'>
                                <CarouselContent>
                                    {products.map((product) => (
                                        <CarouselItem
                                            key={product.id}
                                            className='basis-1/5 max-md:basis-1/4'>
                                            <ProductCard product={product} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </TabsContent>
                        </Tabs>

                        <Link
                            className='block max-lg:ml-auto'
                            href='/catalogue'>
                            <Button
                                className='group text-2xl text-accent max-md:text-base'
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
        </div>
    )
}
