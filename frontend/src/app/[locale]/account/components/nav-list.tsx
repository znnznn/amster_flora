'use client'

import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export const NavList = () => {
    const pathname = usePathname()

    return (
        <ul className='space-y-6'>
            <li className='group h-11'>
                <Link
                    prefetch
                    className={cn(
                        'flex h-full items-center gap-x-4 text-lg group-hover:text-primary',
                        pathname === '/account/profile'
                            ? 'text-primary'
                            : 'text-primary/50'
                    )}
                    href='/account/profile'
                >
                    <svg
                        width='44'
                        height='44'
                        viewBox='0 0 44 44'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <circle
                            cx='22'
                            cy='15.625'
                            r='4.25'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M32.625 34.0417C31.9515 20.8194 12.0485 20.8194 11.375 34.0417'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>

                    <span>Персональні дані</span>
                </Link>
            </li>
            <li className='group h-11'>
                <Link
                    prefetch
                    className={cn(
                        'flex h-full items-center gap-x-4 text-lg group-hover:text-primary',
                        pathname === '/account/orders'
                            ? 'text-primary'
                            : 'text-primary/50'
                    )}
                    href='/account/orders'
                >
                    <svg
                        width='44'
                        height='44'
                        viewBox='0 0 44 44'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M17.6582 14.9167H16.0116C14.4931 14.9167 13.2327 16.0654 13.1245 17.5481L12.0908 31.7148C11.9711 33.3549 13.2981 34.75 14.9779 34.75H29.022C30.7018 34.75 32.0288 33.3549 31.9091 31.7148L30.8753 17.5481C30.7671 16.0654 29.5068 14.9167 27.9882 14.9167H26.3416M17.6582 14.9167V12.0833C17.6582 10.5185 18.9541 9.25 20.5527 9.25H23.4472C25.0457 9.25 26.3416 10.5185 26.3416 12.0833V14.9167M17.6582 14.9167H26.3416'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>

                    <span>Мої замовлення</span>
                </Link>
            </li>
            <li className='group h-11'>
                <Link
                    prefetch
                    className={cn(
                        'flex h-full items-center gap-x-4 text-lg group-hover:text-primary',
                        pathname === '/account/wish-list'
                            ? 'text-primary'
                            : 'text-primary/50'
                    )}
                    href='/account/wish-list'
                >
                    <svg
                        width='44'
                        height='44'
                        viewBox='0 0 44 44'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M15.9792 9.95801C12.2628 9.95801 9.25 13.1591 9.25 17.1077C9.25 25.0101 22 34.0413 22 34.0413C22 34.0413 34.75 25.0101 34.75 17.1077C34.75 12.2158 31.7372 9.95801 28.0208 9.95801C25.3858 9.95801 23.1045 11.5672 22 13.9112C20.8955 11.5672 18.6142 9.95801 15.9792 9.95801Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>

                    <span>Збережене</span>
                </Link>
            </li>
            <li className='group h-11'>
                <Link
                    prefetch
                    className={cn(
                        'flex h-full items-center gap-x-4 text-lg group-hover:text-primary',
                        pathname === '/account/viewed'
                            ? 'text-primary'
                            : 'text-primary/50'
                    )}
                    href='/account/viewed'
                >
                    <svg
                        width='44'
                        height='44'
                        viewBox='0 0 44 44'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M8.61186 23.9909C8.2268 23.4626 8.03427 23.1984 7.90175 22.6873C7.81042 22.335 7.81042 21.6643 7.90175 21.3121C8.03427 20.8009 8.2268 20.5368 8.61186 20.0084C10.7219 17.1131 15.3453 12.083 21.9999 12.083C28.6545 12.083 33.278 17.1131 35.388 20.0084C35.773 20.5368 35.9656 20.8009 36.0981 21.3121C36.1894 21.6643 36.1894 22.335 36.0981 22.6873C35.9656 23.1984 35.773 23.4626 35.388 23.9909C33.278 26.8862 28.6545 31.9163 21.9999 31.9163C15.3453 31.9163 10.7219 26.8862 8.61186 23.9909Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M22.0001 24.8337C23.5649 24.8337 24.8334 23.5651 24.8334 22.0003C24.8334 20.4355 23.5649 19.167 22.0001 19.167C20.4353 19.167 19.1667 20.4355 19.1667 22.0003C19.1667 23.5651 20.4353 24.8337 22.0001 24.8337Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>

                    <span>Переглянуті</span>
                </Link>
            </li>
        </ul>
    )
}
