'use client'

import { Eye, Heart, ShoppingBag, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LogOutButton } from '../../components/log-out'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const AccountSidebar = () => {
    const pathname = usePathname()
    return (
        <aside className='h-[430px] rounded-r-[22px] border-y border-r py-6 pl-14 pr-6'>
            <nav className='flex h-full flex-col items-start justify-between'>
                <ul className='flex flex-col gap-y-4'>
                    <li>
                        <Button
                            asChild
                            className={cn(
                                'text-lg text-muted hover:text-primary',
                                pathname === '/account/profile' ? 'text-primary' : ''
                            )}
                            variant='link'>
                            <Link href='/account/profile'>
                                <UserRound className='!size-5' />
                                Персональні дані
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            asChild
                            className={cn(
                                'text-lg text-muted hover:text-primary',
                                pathname === '/account/orders' ? 'text-primary' : ''
                            )}
                            variant='link'>
                            <Link href={'/account/orders'}>
                                <ShoppingBag className='!size-5' />
                                Мої замовлення
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            asChild
                            className={cn(
                                'text-lg text-muted hover:text-primary',
                                pathname === '/account/favorite' ? 'text-primary' : ''
                            )}
                            variant='link'>
                            <Link href={'/account/favorite'}>
                                <Heart className='!size-5' />
                                Збережене
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            asChild
                            className={cn(
                                'text-lg text-muted hover:text-primary',
                                pathname === '/account/watched' ? 'text-primary' : ''
                            )}
                            variant='link'>
                            <Link href={'/account/watched'}>
                                <Eye className='!size-5' />
                                Переглянуті
                            </Link>
                        </Button>
                    </li>
                </ul>

                <LogOutButton className='text-lg text-muted hover:bg-transparent hover:text-primary [&_svg]:!size-5' />
            </nav>
        </aside>
    )
}
