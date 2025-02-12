import { CurrencySelector } from '../currency-selector'
import { LanguageSelector } from '../language-selector'
import { buttonVariants } from '../ui/button'

import { Logo } from '@/components/logo'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export const Header = () => {
    return (
        <header className='sticky top-0 z-10 bg-primary'>
            <div className='bg-accent'>
                <div className='container flex h-7 items-center justify-between gap-4'>
                    <Link
                        className='font-medium text-primary transition-all hover:underline'
                        href='tel:+380687778893'
                    >
                        +380 068 777 88 93
                    </Link>
                    <div className='flex items-center gap-2'>
                        <LanguageSelector className='h-6 bg-transparent !ring-0 !ring-offset-0' />
                        <CurrencySelector className='h-6 bg-transparent !ring-0 !ring-offset-0' />
                    </div>
                </div>
            </div>
            <div className='container flex h-[70px] items-center justify-between'>
                <Logo />
                <div className='flex items-center gap-5'>
                    <Link
                        href='/search'
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'icon' }),
                            'bg-transparent hover:text-background'
                        )}
                    >
                        <svg
                            className='!size-11'
                            width='44'
                            height='44'
                            viewBox='0 0 44 44'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M28.9316 28.9701L33.2951 33.3337M32.0358 21.4069C32.0358 27.3384 27.2436 32.1468 21.3321 32.1468C15.4206 32.1468 10.6284 27.3384 10.6284 21.4069C10.6284 15.4754 15.4206 10.667 21.3321 10.667C27.2436 10.667 32.0358 15.4754 32.0358 21.4069Z'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </Link>
                    <Link
                        href='/account/wish-list'
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'icon' }),
                            'bg-transparent hover:text-background'
                        )}
                    >
                        <svg
                            className='!size-10'
                            width='45'
                            height='44'
                            viewBox='0 0 45 44'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M16.6457 9.95801C12.9293 9.95801 9.9165 13.1591 9.9165 17.1077C9.9165 25.0101 22.6665 34.0413 22.6665 34.0413C22.6665 34.0413 35.4165 25.0101 35.4165 17.1077C35.4165 12.2158 32.4038 9.95801 28.6873 9.95801C26.0523 9.95801 23.771 11.5672 22.6665 13.9112C21.562 11.5672 19.2807 9.95801 16.6457 9.95801Z'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </Link>
                    <Link
                        href='/account/orders'
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'icon' }),
                            'bg-transparent hover:text-background'
                        )}
                    >
                        <svg
                            className='!size-11'
                            width='44'
                            height='44'
                            viewBox='0 0 44 44'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M10.2545 12.775H31.8091C33.7608 12.775 35.1704 14.575 34.6358 16.3844L32.2919 24.3178C31.9322 25.5353 30.7784 26.375 29.4652 26.375H16.4915C15.1783 26.375 14.0245 25.5353 13.6648 24.3178L10.2545 12.775ZM10.2545 12.775L9.25 9.375'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <path
                                d='M16.375 34.625C17.5486 34.625 18.5 33.6736 18.5 32.5C18.5 31.3264 17.5486 30.375 16.375 30.375C15.2014 30.375 14.25 31.3264 14.25 32.5C14.25 33.6736 15.2014 34.625 16.375 34.625Z'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <path
                                d='M27.625 34.625C28.7986 34.625 29.75 33.6736 29.75 32.5C29.75 31.3264 28.7986 30.375 27.625 30.375C26.4514 30.375 25.5 31.3264 25.5 32.5C25.5 33.6736 26.4514 34.625 27.625 34.625Z'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    )
}
