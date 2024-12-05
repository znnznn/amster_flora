'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from './ui/button'
import flower from '@/assets/images/flower.jpg'
import defaultImage from '@/assets/images/flower.png'
import flowerpot from '@/assets/images/flowerpot.jpg'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const flowers = [
    { title: 'Троянда', cover: flowerpot },
    { title: 'Тюльпан', cover: flower },
    { title: 'Лілія', cover: defaultImage },
    { title: 'Флорес', cover: flower },
    { title: 'Орнітогалум', cover: flowerpot },
    { title: 'Еустома', cover: flower },
    { title: 'Півонії', cover: flowerpot },
    { title: 'Троянда', cover: flower },
    { title: 'Тюльпан', cover: flowerpot },
    { title: 'Лілія', cover: defaultImage },
    { title: 'Флорес', cover: flower },
    { title: 'Орнітогалум', cover: defaultImage },
    { title: 'Еустома', cover: defaultImage },
    { title: 'Півонії', cover: flower }
]

interface HeaderCatalogueProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const HeaderCatalogue = ({ className }: HeaderCatalogueProps) => {
    const [open, setOpen] = useState(false)
    const [currentImage, setCurrentImage] = useState(defaultImage)

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}>
            <SheetTrigger
                className={cn('p-1 transition-colors hover:text-background', className)}>
                <span>Букети</span>
            </SheetTrigger>
            <SheetContent
                className='flex h-80 items-center justify-between gap-x-12 rounded-b-3xl border border-t-0 border-accent px-24 max-md:px-10 max-sm:px-3'
                side='top'>
                <div className='flex h-full flex-col items-start justify-between gap-x-6'>
                    <ul className='flex w-4/6 flex-wrap items-center gap-4'>
                        {flowers.map((flower) => (
                            <li key={flower.title}>
                                <Button
                                    onMouseEnter={() => setCurrentImage(flower.cover)}
                                    onMouseLeave={() => setCurrentImage(defaultImage)}
                                    className='text-left text-lg text-accent'
                                    variant='link'>
                                    {flower.title}
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <Link href='/catalogue'>
                        <Button
                            onClick={() => setOpen(false)}
                            tabIndex={-1}
                            className='group text-lg text-accent'
                            variant='link'>
                            Дивитись всі букети
                            <ArrowRight className='!size-6 transition-transform group-hover:translate-x-2' />
                        </Button>
                    </Link>
                </div>
                <Image
                    className='aspect-square size-60 rounded-3xl object-cover'
                    src={currentImage}
                    alt='Flower image'
                />
            </SheetContent>
        </Sheet>
    )
}
