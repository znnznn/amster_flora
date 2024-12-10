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
import { ScrollArea } from '@/components/ui/scroll-area'

export const AddLetterModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className='max-md:px-2 max-md:text-sm'
                    variant='ghost'>
                    <BookHeart className='size-5 max-md:size-4' />
                    <span className='hidden sm:inline'>Підписати листівку</span>
                    <span className='sm:hidden'>Листівка</span>
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[620px] px-14'>
                <DialogHeader>
                    <DialogTitle>Обрати листівку</DialogTitle>
                    <Carousel
                        opts={{
                            loop: true,
                            align: 'start',
                            dragFree: true
                        }}
                        className='!mt-8 flex items-center justify-between gap-x-6'>
                        <CarouselPrevious className='static translate-y-0 border-accent text-accent' />

                        <CarouselContent>
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

                    <ScrollArea className='!mt-6 h-[440px] py-2'>
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
        <div className='flex h-36 items-center justify-between gap-x-6 overflow-hidden rounded-3xl bg-background'>
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
                className='h-full w-48 rounded-3xl object-cover'
                src={flower}
                alt='Флорес'
            />
        </div>
    )
}
