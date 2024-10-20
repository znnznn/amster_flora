import { Heart, Search, ShoppingCart, UserRound } from 'lucide-react'
import Link from 'next/link'

import { CitySelect } from './city-select'
import { CurrencySelect } from './currency-select'
import { LangSelect } from './lang-select'
import { Logo } from './logo'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export const Header = () => {
    return (
        <header>
            <HeaderTop />
            <div className='grid h-20 grid-cols-3 grid-rows-1 items-center gap-x-8 bg-primary px-20 text-accent'>
                <HeaderNav />
                <Logo className='mx-auto' />
                <ul className='flex items-center justify-end gap-x-4 text-accent'>
                    <li>
                        <Link
                            className='inline-block p-1'
                            href='/search'>
                            <Search className='size-6' />
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='inline-block p-1'
                            href='/profile'>
                            <UserRound className='size-6' />
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='inline-block p-1'
                            href='/favorites'>
                            <Heart className='size-6' />
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='inline-block p-1'
                            href='/cart'>
                            <ShoppingCart className='size-6' />
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

const HeaderNav = () => {
    return (
        <nav>
            <ul className='flex items-center gap-x-4 font-medium'>
                <li>
                    <Link
                        className='p-1 transition-colors hover:text-background'
                        href='/bouquets'>
                        Букети
                    </Link>
                </li>
                <li>
                    <Link
                        className='p-1 transition-colors hover:text-background'
                        href='/'>
                        Вазони
                    </Link>
                </li>
                <li>
                    <Link
                        className='p-1 transition-colors hover:text-background'
                        href='/promo'>
                        Акції
                    </Link>
                </li>
                <li>
                    <ClientMenuItem />
                </li>
            </ul>
        </nav>
    )
}

const ClientMenuItem = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='p-1 transition-colors hover:text-background'>
                Клієнту
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mt-[18px] w-64 rounded-t-none border-t-0 border-accent bg-primary p-4 text-accent'>
                <Link href='/payment-and-delivery'>
                    <DropdownMenuItem className='cursor-pointer py-2 text-lg'>
                        Оплата і доставка
                    </DropdownMenuItem>
                </Link>

                <Link href='/privacy-policy'>
                    <DropdownMenuItem className='mt-2 cursor-pointer py-2 text-lg'>
                        Політика конфіденційності
                    </DropdownMenuItem>
                </Link>
                <Link href='/blog'>
                    <DropdownMenuItem className='mt-2 cursor-pointer py-2 text-lg'>
                        Блог
                    </DropdownMenuItem>
                </Link>
                <Link href='/story'>
                    <DropdownMenuItem className='mt-2 cursor-pointer py-2 text-lg'>
                        Історія
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HeaderTop = () => {
    return (
        <div className='grid h-8 grid-cols-3 grid-rows-1 items-center gap-x-8 bg-accent px-20 py-1.5 text-primary'>
            <CitySelect />
            <Link
                className='mx-auto w-fit font-medium text-primary transition-colors hover:text-background'
                href='tel:+3800687778893'>
                +380 068 777 88 93
            </Link>
            <div className='flex items-center justify-end gap-x-4'>
                <LangSelect />
                <CurrencySelect />
            </div>
        </div>
    )
}
