import { ArrowRight, Eye, Heart, ShoppingBag, UserRound } from 'lucide-react'
import Link from 'next/link'

export const Account = () => {
    return (
        <ul className='max-mg:mt-8 mt-12 grid grid-cols-2 grid-rows-2 gap-7 max-lg:mt-10 max-lg:gap-5 max-md:grid-cols-1 max-md:grid-rows-1 max-md:gap-3'>
            <li>
                <Link
                    href='/account/profile'
                    className='group flex h-full flex-col gap-y-5 rounded-[22px] border p-6 transition-colors hover:border-accent max-md:p-5'>
                    <h3 className='flex items-center gap-x-4 text-lg font-medium max-md:text-sm'>
                        <UserRound className='size-6' />
                        Персональні дані
                    </h3>
                    <p className='text-primary/80 max-md:text-sm'>
                        Налаштування особистої інформації
                    </p>
                    <button className='flex items-center justify-end transition-colors group-hover:text-accent max-md:text-sm'>
                        Перейти
                        <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                    </button>
                </Link>
            </li>
            <li>
                <Link
                    href='/account/favorite'
                    className='group flex h-full flex-col gap-y-5 rounded-[22px] border p-6 transition-colors hover:border-accent'>
                    <h3 className='flex items-center gap-x-4 text-lg font-medium max-md:text-sm'>
                        <Heart className='size-6' />
                        Збережене
                    </h3>
                    <p className='text-primary/80 max-md:text-sm'>
                        Переглядайте всі товари, які ви додали до вподобань.
                    </p>
                    <button className='flex items-center justify-end transition-colors group-hover:text-accent max-md:text-sm'>
                        Перейти
                        <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                    </button>
                </Link>
            </li>
            <li>
                <Link
                    href='/account/orders'
                    className='group flex h-full flex-col gap-y-5 rounded-[22px] border p-6 transition-colors hover:border-accent'>
                    <h3 className='flex items-center gap-x-4 text-lg font-medium max-md:text-sm'>
                        <ShoppingBag className='size-6' />
                        Мої замовлення
                    </h3>
                    <p className='text-primary/80 max-md:text-sm'>
                        Переглядайте історію покупок, відслідковуйте статус замовлення
                    </p>
                    <button className='flex items-center justify-end transition-colors group-hover:text-accent max-md:text-sm'>
                        Перейти
                        <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                    </button>
                </Link>
            </li>
            <li>
                <Link
                    href='/account/watched'
                    className='group flex h-full flex-col gap-y-5 rounded-[22px] border p-6 transition-colors hover:border-accent'>
                    <h3 className='flex items-center gap-x-4 text-lg font-medium max-md:text-sm'>
                        <Eye className='size-6' />
                        Переглянуті
                    </h3>
                    <p className='text-primary/80 max-md:text-sm'>
                        Переглядайте всі товари, які ви додали до вподобань.
                    </p>
                    <button className='flex items-center justify-end transition-colors group-hover:text-accent max-md:text-sm'>
                        Перейти
                        <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                    </button>
                </Link>
            </li>
        </ul>
    )
}
