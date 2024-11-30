'use client'
import {
    Facebook,
    Heart,
    Instagram,
    Menu,
    Search,
    ShoppingCart,
    UserRound,
    X
} from 'lucide-react'
import Link from 'next/link'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { useAuth } from '@/hooks/use-auth'
import { AuthModal } from './auth/modal'
import { CitySelect } from './city-select'
import { CurrencySelect } from './currency-select'
import { HeaderCatalogue } from './header-catalogue'
import { LangSelect } from './lang-select'
import { Logo } from './logo'
import { Button } from './ui/button'

export const Header = () => {
    const {isAuthenticated} = useAuth()

    return (
        <>
            <HeaderTop />

            <header className='sticky top-0 z-50 border-b border-b-accent bg-primary'>
                <div className='container grid h-20 grid-cols-3 grid-rows-1 items-center gap-x-8 text-accent'>
                    <HeaderNav />
                    <MobileHeaderNav />
                    <Logo className='mx-auto' />
                    <ul className='flex items-center justify-end gap-x-4 text-accent'>
                        <li>
                            <Link
                                className='block p-1 transition-colors hover:text-background'
                                href='/search'>
                                <Search className='size-6' />
                            </Link>
                        </li>
                        <li className='max-lg:hidden'>
                            {isAuthenticated ? (
                                <Link
                                    className='block p-1 transition-colors hover:text-background'
                                    href='/account'>
                                    <UserRound className='size-6' />
                                </Link>
                            ) : (
                                <AuthModal />
                            )}
                        </li>
                        <li className='max-lg:hidden'>
                            <Link
                                className='block p-1 transition-colors hover:text-background'
                                href='/account/favorite'>
                                <Heart className='size-6' />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='block p-1 transition-colors hover:text-background'
                                href='/cart'>
                                <ShoppingCart className='size-6' />
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}

const HeaderNav = () => {
    return (
        <nav className='max-lg:hidden'>
            <ul className='flex items-center gap-x-4 font-medium'>
                <li>
                    <HeaderCatalogue />
                </li>
                <li>
                    <Link
                        className='p-1 transition-colors hover:text-background'
                        href='/catalogue'>
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
            <DropdownMenuTrigger
                asChild
                className='p-1 transition-colors hover:text-background'>
                <span>Клієнту</span>
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
        <div className='bg-accent'>
            <div className='container grid h-8 grid-cols-3 grid-rows-1 items-center gap-x-8 py-1.5 text-primary max-lg:hidden'>
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
        </div>
    )
}

const MobileHeaderNav = () => {
    const {isAuthenticated} = useAuth()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className='hidden max-lg:flex'>
                    <Menu className='!size-6' />
                </Button>
            </SheetTrigger>
            <SheetContent
                showCloseButton={false}
                className='border-none bg-background p-0 max-[480px]:w-full'
                side='left'>
                <SheetHeader className='flex flex-row items-center justify-between bg-primary px-5 py-2'>
                    <SheetTitle className='sr-only'>Mobile Nav</SheetTitle>
                    <Logo className='w-14' />
                    <SheetClose
                        className='!mt-0'
                        asChild>
                        <Button
                            className='hover:bg-accent/10'
                            size='icon'
                            variant='ghost'>
                            <X className='!size-5 text-accent' />
                        </Button>
                    </SheetClose>
                </SheetHeader>
                <div className='px-5 py-6'>
                    <div className='flex flex-col gap-y-3'>
                        <CitySelect
                            className='w-full p-1'
                            withIcon
                        />
                        {isAuthenticated ? (
                            <Link
                                className='flex items-center gap-x-2 p-1 transition-colors hover:text-background'
                                href='/account'>
                                <UserRound className='size-6' />
                                Особистий кабінет
                            </Link>
                        ) : (
                            <AuthModal
                                className='hover:text-accent'
                                withText
                            />
                        )}
                    </div>

                    <nav className='mt-6'>
                        <ul className='flex flex-col gap-x-4 font-medium'>
                            <li className='w-full py-3'>
                                <HeaderCatalogue className='w-full p-0 text-left hover:text-accent' />
                            </li>
                            <li className='w-full py-3'>
                                <Link
                                    className='block transition-colors hover:text-accent'
                                    href='/catalogue'>
                                    Вазони
                                </Link>
                            </li>
                            <li className='w-full py-3'>
                                <Link
                                    className='block transition-colors hover:text-accent'
                                    href='/promo'>
                                    Акції
                                </Link>
                            </li>
                            <li className='w-full py-3'>
                                <Accordion
                                    type='single'
                                    collapsible>
                                    <AccordionItem
                                        className='border-none py-0'
                                        value='company'>
                                        <AccordionTrigger className='py-0 text-base'>
                                            Суміжні товари
                                        </AccordionTrigger>
                                        <AccordionContent className='pb-0 pt-3'>
                                            Links
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </li>
                            <li className='w-full py-3'>
                                <Accordion
                                    type='single'
                                    collapsible>
                                    <AccordionItem
                                        className='border-none py-0'
                                        value='company'>
                                        <AccordionTrigger className='py-0 text-base'>
                                            Компанія
                                        </AccordionTrigger>
                                        <AccordionContent className='pb-0 pt-3'>
                                            Links
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </li>
                        </ul>
                    </nav>
                    <div className='mt-10'>
                        <LangSelect className='w-fit' />
                        <CurrencySelect />
                    </div>
                </div>
                <SheetFooter className='flex !flex-col items-center justify-center gap-y-4'>
                    <div className='flex items-center gap-x-5'>
                        {' '}
                        <Link href='tel:+3800687778893'>
                            <Button
                                variant='ghost'
                                size='icon'>
                                <Facebook className='!size-6' />
                            </Button>
                        </Link>
                        <Link href='tel:+3800687778893'>
                            <Button
                                variant='ghost'
                                size='icon'>
                                <Instagram className='!size-6' />
                            </Button>
                        </Link>
                    </div>
                    <Link
                        className='font-medium transition-colors hover:text-accent'
                        href='tel:+3800687778893'>
                        +380 068 777 88 93
                    </Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
