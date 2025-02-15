'use client'

import { useTranslations } from 'next-intl'
import { type JSX, useEffect, useState } from 'react'

import { Button, buttonVariants } from '../ui/button'

import { ForgetPasswordMail } from './forget-password-mail'
import { Login } from './login'
import { SignUp } from './sign-up'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useAuthContext } from '@/providers/auth-provider'

export type State = 'login' | 'sign-up' | 'forgot-password-mail'

export const AuthPopup = () => {
    const { isAuthenticated } = useAuthContext()

    const t = useTranslations('Common.Auth')
    const [authState, setAuthState] = useState<State>('login')
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const authView: Record<State, { title: string; component: JSX.Element }> = {
        login: {
            title: t('LoginTitle'),
            component: <Login setAuthState={setAuthState} />
        },
        'sign-up': {
            title: t('SignUpTitle'),
            component: <SignUp setAuthState={setAuthState} />
        },
        'forgot-password-mail': {
            title: t('RecoverPassword'),
            component: <ForgetPasswordMail setAuthState={setAuthState} />
        }
    }

    if (!isMounted) {
        return null
    }

    if (isAuthenticated) {
        return (
            <Link
                href='/account'
                className={cn(
                    buttonVariants({ variant: 'default', size: 'icon' }),
                    'bg-transparent hover:text-background'
                )}
            >
                <UserIcon />
            </Link>
        )
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    className='bg-transparent hover:text-background'
                    size='icon'
                >
                    <UserIcon />
                </Button>
            </SheetTrigger>
            <SheetContent
                side='top'
                className='inset-x-auto !right-32 top-[calc(var(--header-top-height)+var(--header-height))] z-40 w-full max-w-[480px] p-12'
                overlayClassName='z-40'
            >
                <SheetHeader>
                    <SheetTitle className='text-center text-2xl'>
                        {authView[authState].title}
                    </SheetTitle>
                </SheetHeader>
                {authView[authState].component}
            </SheetContent>
        </Sheet>
    )
}

const UserIcon = () => (
    <svg
        className='!size-auto'
        width='35'
        height='34'
        viewBox='0 0 35 34'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <circle
            cx='17.3335'
            cy='10.625'
            r='4.25'
            stroke='#EFBBC5'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M27.9585 29.0417C27.285 15.8194 7.38195 15.8194 6.7085 29.0417'
            stroke='#EFBBC5'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)
