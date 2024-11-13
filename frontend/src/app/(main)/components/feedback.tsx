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
        <section className='rela mt-28 px-20 max-md:mt-16 max-md:px-16 max-sm:mt-10 max-sm:px-4'>
            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                    dragFree: true
                }}>
                <div className='relative mx-auto flex w-fit items-center gap-x-4'>
                    <CarouselPrevious className='border-primary text-primary' />
                    <h2 className='text-left text-[28px] font-bold'>Відгуки</h2>
                    <CarouselNext className='border-primary text-primary' />
                </div>

                <CarouselContent className='mt-10'>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className='basis-1/3'>
                            <FeedbackCard />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    )
}

const FeedbackCard = () => {
    return (
        <div className='h-72 rounded-[22px] bg-primary px-6 py-8'>
            <div className='flex items-center gap-x-8'>
                <Image
                    src={avatar}
                    alt='Аватар'
                    className='size-20 shrink-0 rounded-full'
                />
                <div className='flex flex-col gap-y-2'>
                    <h3 className='text-[22px] font-medium text-accent'>Dakota Grant</h3>
                    <div className='flex items-center gap-x-2'>
                        <Star className='size-5 fill-accent text-accent' />
                        <Star className='size-5 fill-accent text-accent' />
                        <Star className='size-5 fill-accent text-accent' />
                        <Star className='size-5 fill-accent text-accent' />
                        <Star className='size-5 text-accent' />
                    </div>
                </div>
            </div>
            <p className='mt-3 text-background'>
                "Замовляла букет для особливого випадку — квіти були просто неймовірні!
                Свіжі, ароматні, з гарним поєднанням кольорів. Доставка швидка, а сам
                букет виглядав навіть краще, ніж на фото. Рекомендую всім!"
            </p>
        </div>
    )
}
