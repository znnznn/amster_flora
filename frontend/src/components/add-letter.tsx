import { BookHeart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

import flower from '@/assets/images/flower.jpg'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ScrollArea } from './ui/scroll-area'

export const AddLetterModal = ({
    className
}: React.HtmlHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={cn(className)}
                    variant='ghost'>
                    <BookHeart className='size-5' />
                    Підписати листівку
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl px-14'>
                <DialogHeader>
                    <DialogTitle className='text-center'>Обрати листівку</DialogTitle>
                    <Carousel
                        opts={{
                            loop: true,
                            align: 'start',
                            dragFree: true
                        }}
                        className='!mt-8 flex w-full items-center justify-between gap-x-6'>
                        <CarouselPrevious className='static translate-y-0 border-accent text-accent' />

                        <CarouselContent className='w-full'>
                            <CarouselItem className='basis-1/4'>
                                <Button
                                    className='text-accent'
                                    size='sm'
                                    variant='ghost'>
                                    Вази
                                </Button>
                            </CarouselItem>
                            <CarouselItem className='basis-1/4'>
                                <Button
                                    className='text-accent'
                                    size='sm'
                                    variant='ghost'>
                                    Вази
                                </Button>
                            </CarouselItem>
                            <CarouselItem className='basis-1/4'>
                                <Button
                                    className='text-accent'
                                    size='sm'
                                    variant='ghost'>
                                    Вази
                                </Button>
                            </CarouselItem>
                            <CarouselItem className='basis-1/4'>
                                <Button
                                    className='text-accent'
                                    size='sm'
                                    variant='ghost'>
                                    Вази
                                </Button>
                            </CarouselItem>
                            <CarouselItem className='basis-1/4'>
                                <Button
                                    className='text-accent'
                                    size='sm'
                                    variant='ghost'>
                                    Вази
                                </Button>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselNext className='static translate-y-0 border-accent text-accent' />
                    </Carousel>

                    <ScrollArea className='!mt-6 h-[440px] py-2 max-md:h-80'>
                        <ul className='flex flex-col gap-y-3'>
                            <li>
                                <GiftCard />
                            </li>
                            <li>
                                <GiftCard />
                            </li>
                            <li>
                                <GiftCard />
                            </li>
                        </ul>
                    </ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const GiftCard = () => {
    return (
        <div className='flex h-36 max-w-full items-center justify-between gap-x-6 overflow-hidden rounded-3xl bg-background'>
            <div className='px-5 py-7'>
                <div className='flex items-center justify-between gap-x-4 text-lg font-medium'>
                    <span>Ваза</span>
                    <span>100 ₴</span>
                </div>
                <Button
                    className='mt-4'
                    variant='secondary'>
                    До кошика
                    <ShoppingCart className='ml-2 size-4' />
                </Button>
            </div>
            <Image
                className='h-full w-48 rounded-3xl object-cover max-md:w-36'
                src={flower}
                alt='Флорес'
            />
        </div>
    )
}
