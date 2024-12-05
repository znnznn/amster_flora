'use client'

import { usePathname } from 'next/navigation'

const getTitle = (pathname: string) => {
    switch (pathname) {
        case '/account':
            return 'Персональні дані'
        case '/account/orders':
            return 'Мої замовлення'
        case '/account/favorite':
            return 'Збережене'
        case '/account/watched':
            return 'Переглянуті'
        default:
            return 'Персональні дані'
    }
}

export const LayoutTitle = () => {
    const pathname = usePathname()
    const title = getTitle(pathname)
    return (
        <h1 className='container mt-3 text-center text-2xl font-semibold max-md:text-lg'>
            {title}
        </h1>
    )
}
