import { getTranslations } from 'next-intl/server'
import Link, { type LinkProps } from 'next/link'
import React from 'react'

import { CategoriesPopup } from '../categories-popup'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuViewport
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export const HeaderNav = async () => {
    const t = await getTranslations('Common.HeaderNav')

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <CategoriesPopup />
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link
                        href='/'
                        legacyBehavior
                        passHref
                    >
                        <NavigationMenuLink className='rounded-md px-3.5 py-2 text-lg font-medium text-accent ring-offset-2 hover:text-background focus-visible:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2'>
                            {t('Flowerpots')}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link
                        href='/'
                        legacyBehavior
                        passHref
                    >
                        <NavigationMenuLink className='rounded-md px-3.5 py-2 text-lg font-medium text-accent ring-offset-2 hover:text-background focus-visible:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2'>
                            {t('Sales')}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <HoverCard
                        openDelay={100}
                        closeDelay={150}
                    >
                        <HoverCardTrigger className='rounded-md px-3.5 py-2 text-lg font-medium text-accent ring-offset-2 hover:text-background focus-visible:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2'>
                            {t('Client.Title')}
                        </HoverCardTrigger>
                        <HoverCardContent
                            sideOffset={16}
                            className='rounded-b-3xl rounded-t-none border-t-0'
                            asChild
                        >
                            <ul className='bg-primary px-6 py-3'>
                                <ListItem
                                    href='/'
                                    title={t('Client.Delivery')}
                                />
                                <ListItem
                                    href='/'
                                    title={t('Client.Policy')}
                                />
                                <ListItem
                                    href='/blog'
                                    title={t('Client.Blog')}
                                />

                                <ListItem
                                    href='/story'
                                    title={t('Client.Story')}
                                />
                            </ul>
                        </HoverCardContent>
                    </HoverCard>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport className='rounded-t-none' />
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'> & LinkProps
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        'block select-none py-3.5 leading-none text-accent no-underline outline-none transition-colors hover:text-background focus:text-background',
                        className
                    )}
                    {...props}
                >
                    <div className='text-lg leading-none'>{title}</div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
