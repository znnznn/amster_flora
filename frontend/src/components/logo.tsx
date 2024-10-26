import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logo.svg'
import { cn } from '@/lib/utils'

type LogoProps = React.HTMLAttributes<typeof Link>

export const Logo = ({ className }: LogoProps) => {
    return (
        <Link
            className={cn('shrink-0', className)}
            href='/'>
            <Image
                priority
                src={logo}
                alt='Amster'
            />
        </Link>
    )
}
