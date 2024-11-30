import { Star } from 'lucide-react'
import Image from 'next/image'

import avatar from '@/assets/images/avatar.jpg'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'

export const Feedback = () => {
    return (
        <section className='mt-28 max-md:mt-16'>
            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                    dragFree: true
                }}>
                <div>
                    <div className='relative mx-auto flex w-fit items-center gap-x-4'>
                        <CarouselPrevious className='border-primary text-primary' />
                        <h2 className='text-left text-2xl font-bold max-md:text-lg'>
                            Відгуки
                        </h2>
                        <CarouselNext className='border-primary text-primary' />
                    </div>
                    <div className='container relative left-5 mr-0 mt-10 px-0 2xl:left-0 2xl:mr-auto 2xl:pr-4'>
                        <CarouselContent>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <CarouselItem
                                    key={index}
                                    className='min-w-96 basis-1/4 max-lg:basis-1/2'>
                                    <FeedbackCard />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </div>
                </div>
            </Carousel>
        </section>
    )
}

const FeedbackCard = () => {
    return (
        <div className='rounded-3xl bg-primary px-6 py-8'>
            <div className='flex items-center gap-x-8 max-sm:gap-x-4'>
                <Image
                    src={avatar}
                    alt='Аватар'
                    className='size-20 shrink-0 rounded-full max-md:size-16'
                />
                <div className='flex flex-col gap-y-2'>
                    <h3 className='text-2xl font-medium text-accent max-md:text-base'>
                        Dakota Grant
                    </h3>
                    <div className='flex items-center gap-x-2'>
                        <Star className='size-5 fill-accent text-accent' />
                        <Star className='size-5 fill-accent text-accent' />
                        <Star className='size-5 fill-accent text-accent' />
                        <Star className='size-5 fill-accent text-accent' />
                        <Star className='size-5 text-accent' />
                    </div>
                </div>
            </div>
            <p className='mt-3 text-background max-md:text-sm'>
                "Замовляла букет для особливого випадку — квіти були просто неймовірні!
                Свіжі, ароматні, з гарним поєднанням кольорів. Доставка швидка, а сам
                букет виглядав навіть краще, ніж на фото. Рекомендую всім!"
            </p>
        </div>
    )
}
