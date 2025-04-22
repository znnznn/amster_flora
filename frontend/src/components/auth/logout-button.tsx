'use client'

import { Button } from '../ui/button'

import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/auth-provider'

interface LogoutButtonProps extends React.ComponentProps<'button'> {
    className?: string
}

export const LogoutButton = ({ className, ...props }: LogoutButtonProps) => {
    const { logout } = useAuth()

    return (
        <Button
            className={cn('!text-base font-normal', className)}
            onClick={logout}
            variant='ghost'
            size='sm'
        >
            <svg
                className='!size-8 shrink-0'
                viewBox='0 0 44 44'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M24.7424 38.5H11.9167C9.89162 38.5 8.25 36.3893 8.25 33.7857V10.2143C8.25 7.61066 9.89162 5.5 11.9167 5.5H24.75'
                    stroke='#002D44'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M29.3333 28.4163L35.7499 21.9997L29.3333 15.583'
                    stroke='#002D44'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M17.4167 21.9922H35.7501'
                    stroke='#002D44'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>

            <span>{props.children}</span>
        </Button>
    )
}
