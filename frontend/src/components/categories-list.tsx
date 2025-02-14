import { useTranslations } from 'next-intl'
import Image from 'next/image'

import type { Product } from '@/api/products/products-types'
import flower from '@/assets/images/flower.png'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

interface ProductsListProps {
    className?: string
    products: Product[]
    onLinkClick?: () => void
}

export const ProductsList = ({ className, products, onLinkClick }: ProductsListProps) => {
    const t = useTranslations('Common.ProductsList')

    return (
        <NavigationMenu
            defaultValue={products[0]?.id?.toString()}
            wrapperClassName='!top-1/2 !-translate-y-1/2 -translate-x-1/2 !left-full'
            viewportClassName='origin-right -translate-x-1/2'
            className={cn(
                'relative mx-auto flex max-w-[1060px] justify-between bg-primary py-14',
                className
            )}
        >
            <div className='flex h-56 max-w-[610px] flex-col justify-between'>
                <NavigationMenuList className='flex-wrap justify-normal gap-1 gap-y-6'>
                    {products.map((product) => (
                        <NavigationMenuItem
                            key={product?.id}
                            value={product?.id?.toString()}
                        >
                            <NavigationMenuTrigger
                                value={product?.id?.toString()}
                                onClick={onLinkClick}
                                className='[&_svg]:hidden'
                                tabIndex={-1}
                            >
                                <Link
                                    href='/'
                                    legacyBehavior
                                    passHref
                                >
                                    <NavigationMenuLink className='rounded-md py-2 text-lg font-medium text-accent ring-offset-2 hover:text-background focus-visible:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2'>
                                        {product.name}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className='!size-60 rounded-3xl'>
                                {product?.variants[0]?.images[0]?.image ? (
                                    <Image
                                        className='size-full rounded-[20px] object-cover'
                                        src={product?.variants[0]?.images[0]?.image}
                                        alt={product?.name}
                                        width={400}
                                        height={200}
                                    />
                                ) : (
                                    <Image
                                        className='size-full scale-105 rounded-[30px] object-cover'
                                        src={flower}
                                        alt='Flower'
                                        width={240}
                                        height={240}
                                    />
                                )}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
                <Link
                    onClick={onLinkClick}
                    href='/catalogue'
                    className='group ml-3.5 flex items-center gap-2 text-lg text-accent'
                >
                    <span className='underline'>{t('SeeAll')}</span>
                    <svg
                        className='w-6 transition-transform group-hover:translate-x-1.5'
                        viewBox='0 0 50 45'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M9.375 22.5H40.625M40.625 22.5L28.9063 33.75M40.625 22.5L28.9063 11.25'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </Link>
            </div>

            <Image
                className='rounded-3xl object-cover'
                src={flower}
                alt='Flower'
                width={240}
                height={240}
            />
        </NavigationMenu>
    )
}
