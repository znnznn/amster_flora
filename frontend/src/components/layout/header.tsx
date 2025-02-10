import { CurrencySelector } from '../currency-selector'
import { LanguageSelector } from '../language-selector'

import { Logo } from '@/components/logo'
import { Link } from '@/i18n/routing'

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
            <div className='container flex h-[70px] items-center'>
                <Logo />
            </div>
        </header>
    )
}
