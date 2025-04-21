import type { Product } from '@/api/products/products-types'
import {
    Carousel,
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious,
    CarouselThumbsContainer,
    SliderMainItem,
    SliderThumbItem
} from '@/components/ui/carousel-extension'
import { Section } from '@/components/ui/section'

interface FlowerCarouselMobileProps {
    flower: Product
}

export const FlowerCarouselMobile = ({ flower }: FlowerCarouselMobileProps) => {
    return (
        <Section className='mt-6 xl:hidden'>
            <Carousel>
                <CarouselMainContainer>
                    {flower.variants[0].images.map((image) => (
                        <SliderMainItem
                            key={image.id}
                            className='flex h-60 items-center justify-center overflow-clip rounded-3xl border border-muted sm:h-96'
                        >
                            <img
                                className='size-full object-cover'
                                src={image.image}
                                alt={'flower'}
                            />
                        </SliderMainItem>
                    ))}
                </CarouselMainContainer>
                <CarouselThumbsContainer className='px-10'>
                    <CarouselNext className='right-0 size-9 !rounded-full' />
                    <CarouselPrevious className='left-0 size-9 !rounded-full' />
                    {flower.variants[0].images.map((image, index) => (
                        <SliderThumbItem
                            index={index}
                            key={image.id}
                            className='h-full shrink-0 rounded-md bg-transparent'
                        >
                            <div className='flex h-full w-32 shrink-0 cursor-pointer items-center justify-center overflow-clip rounded-md border border-muted bg-background'>
                                <img
                                    className='size-full shrink-0 object-cover'
                                    src={image.image}
                                    alt={'flower'}
                                />
                            </div>
                        </SliderThumbItem>
                    ))}
                </CarouselThumbsContainer>
            </Carousel>
        </Section>
    )
}
