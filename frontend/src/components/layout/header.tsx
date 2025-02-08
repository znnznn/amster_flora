import { Logo } from '@/components/logo'
import { Link } from '@/i18n/routing'

export const Header = () => {
    return (
        <header className='bg-primary'>
            <div className='bg-accent'>
                <div className='container flex h-7 items-center'>
                    <Link
                        className='font-medium text-primary transition-all hover:underline'
                        href='tel:+380687778893'
                    >
                        +380 068 777 88 93
                    </Link>
                </div>
            </div>
            <div className='container flex h-[70px] items-center'>
                <Logo />
            </div>
        </header>
    )
}
