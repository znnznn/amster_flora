import { ArrowRight, Eye, Heart, ShoppingBag, UserRound } from 'lucide-react'
import Link from 'next/link'

export const Account = () => {
    return (
        <ul className='max-mg:mt-8 mt-12 grid grid-cols-2 grid-rows-2 gap-7 max-lg:mt-10 max-lg:gap-5 max-md:grid-cols-1 max-md:grid-rows-1 max-md:gap-3'>
            <li>
                <Link
                    href='/account/profile'
                    className='group flex h-full flex-col gap-y-5 rounded-[22px] border p-6 transition-colors hover:border-accent'>
                    <h3 className='flex items-center gap-x-4 text-lg font-medium'>
                        <UserRound className='size-6' />
                        Персональні дані
                    </h3>
                    <p className='text-primary/80'>Налаштування особистої інформації</p>
                    <button className='ml-auto flex items-center justify-end transition-colors group-hover:text-accent'>
                        Перейти
                        <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                    </button>
                </Link>
            </li>
            <li>
                <Link
                    href='/account/favorite'
                    className='group flex h-full flex-col gap-y-5 rounded-[22px] border p-6 transition-colors hover:border-accent'>
                    <h3 className='flex items-center gap-x-4 text-lg font-medium'>
                        <Heart className='size-6' />
                        Збережене
                    </h3>
                    <p className='text-primary/80'>
                        Переглядайте всі товари, які ви додали до вподобань.
                    </p>
                    <button className='ml-auto flex items-center justify-end transition-colors group-hover:text-accent'>
                        Перейти
                        <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                    </button>
                </Link>
            </li>
            <li>
                <Link
                    href='/account/orders'
                    className='group flex h-full flex-col gap-y-5 rounded-[22px] border p-6 transition-colors hover:border-accent'>
                    <h3 className='flex items-center gap-x-4 text-lg font-medium'>
                        <ShoppingBag className='size-6' />
                        Мої замовлення
                    </h3>
                    <p className='text-primary/80'>
                        Переглядайте історію покупок, відслідковуйте статус замовлення
                    </p>
                    <button className='ml-auto flex items-center justify-end transition-colors group-hover:text-accent'>
                        Перейти
                        <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                    </button>
                </Link>
            </li>
            <li>
                <Link
                    href='/account/watched'
                    className='group flex h-full flex-col gap-y-5 rounded-[22px] border p-6 transition-colors hover:border-accent'>
                    <h3 className='flex items-center gap-x-4 text-lg font-medium'>
                        <Eye className='size-6' />
                        Переглянуті
                    </h3>
                    <p className='text-primary/80'>
                        Переглядайте всі товари, які ви додали до вподобань.
                    </p>
                    <button className='ml-auto flex items-center justify-end transition-colors group-hover:text-accent'>
                        Перейти
                        <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                    </button>
                </Link>
            </li>
        </ul>
    )
}
