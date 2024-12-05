'use client'

import { ChevronsUpDown, Flower, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/use-auth'

const navItems = [
    {
        title: 'Букети',
        url: '/admin',
        icon: Flower
    }
]

export const AdminSidebar = () => {
    const pathname = usePathname()

    return (
        <Sidebar collapsible='icon'>
            <AdmibSidebarHeader />
            <SidebarContent className='bg-primary text-background'>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-background/40'>
                        Букети
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        isActive={pathname === item.url}
                                        asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <AdminSidebarFooter />
        </Sidebar>
    )
}

const AdminSidebarFooter = () => {
    const { user, logout } = useAuth()

    const initials =
        user?.first_name?.charAt(0)?.toUpperCase() ||
        '' + user?.last_name?.charAt(0)?.toUpperCase() ||
        ''

    return (
        <SidebarFooter className='bg-primary text-background'>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size='lg'
                                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                                <Avatar className='h-8 w-8 rounded-md'>
                                    <AvatarFallback className='rounded-md bg-accent text-foreground'>
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-semibold'>
                                        {user?.first_name + ' ' + user?.last_name}
                                    </span>
                                    <span className='truncate text-xs'>
                                        {user?.email}
                                    </span>
                                </div>
                                <ChevronsUpDown className='ml-auto size-4' />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md'
                            side='bottom'
                            align='end'
                            sideOffset={4}>
                            <DropdownMenuLabel className='p-0 font-normal'>
                                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                    <Avatar className='h-8 w-8 rounded-md'>
                                        <AvatarFallback className='rounded-md bg-accent text-foreground'>
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='grid flex-1 text-left text-sm leading-tight'>
                                        <span className='truncate font-semibold'>
                                            {user?.first_name + ' ' + user?.last_name}
                                        </span>
                                        <span className='truncate text-xs'>
                                            {user?.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={logout}>
                                <LogOut className='mr-2 size-4' />
                                Вийти з аккаунту
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

const AdmibSidebarHeader = () => {
    return (
        <SidebarHeader className='bg-primary'>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Link href='/'>
                                <SidebarMenuButton
                                    size='lg'
                                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent hover:bg-accent/15'>
                                    <div className='flex aspect-square size-8 items-center justify-center rounded-md bg-accent text-accent-foreground'>
                                        A
                                    </div>
                                    <div className='flex flex-col gap-0.5 leading-none text-background'>
                                        <span className='font-semibold'>
                                            Amster Flora
                                        </span>
                                        {/* <span className='text-xs'>
                                            Production management
                                        </span> */}
                                    </div>
                                </SidebarMenuButton>
                            </Link>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}
