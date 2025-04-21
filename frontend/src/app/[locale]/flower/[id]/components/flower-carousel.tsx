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

interface FlowerCarouselProps {
    flower: Product
}

export const FlowerCarousel = ({ flower }: FlowerCarouselProps) => {
    return (
        <Carousel
            orientation='vertical'
            className='hidden h-full items-center gap-[60px] xl:flex'
        >
            <div className='relative'>
                <CarouselPrevious className='-top-16 size-11 border-accent text-accent' />

                <CarouselThumbsContainer className='h-[460px] basis-1/4'>
                    {flower?.variants[0]?.images.map((image, index) => (
                        <SliderThumbItem
                            key={image.id}
                            index={index}
                            className='rounded-3xl bg-transparent'
                        >
                            <div className='flex h-36 w-[205px] cursor-pointer items-center justify-center overflow-clip rounded-3xl border border-muted bg-background'>
                                <img
                                    className='size-full object-cover'
                                    src={image.image}
                                    alt={'flower'}
                                />
                            </div>
                        </SliderThumbItem>
                    ))}
                </CarouselThumbsContainer>
                <CarouselNext className='-bottom-16 size-11 border-accent text-accent' />
            </div>
            <div className='relative basis-3/4'>
                <CarouselMainContainer className='h-[560px] w-[470px]'>
                    {flower?.variants[0]?.images.map((image) => (
                        <SliderMainItem
                            key={image.id}
                            className='flex h-52 items-center justify-center overflow-clip rounded-3xl border border-muted'
                        >
                            <img
                                className='size-full object-cover'
                                src={image.image}
                                alt={'flower'}
                            />
                        </SliderMainItem>
                    ))}
                </CarouselMainContainer>
            </div>
        </Carousel>
    )
}
