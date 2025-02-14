'use client'

import { useTranslations } from 'next-intl'
import { type JSX, useState } from 'react'

import { Button } from '../ui/button'

import { Login } from './login'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'

export type State = 'login' | 'sign-up' | 'forgot-password'

export const AuthPopup = () => {
    const t = useTranslations('Common.Auth')

    const [authState, setAuthState] = useState<State>('login')

    const authView: Record<State, JSX.Element> = {
        login: <Login setAuthState={setAuthState} />,
        'sign-up': <Login setAuthState={setAuthState} />,
        'forgot-password': <Login setAuthState={setAuthState} />
    }

    const authTitle = {
        login: t('LoginTitle'),
        'sign-up': t('SignUpTitle'),
        'forgot-password': t('RecoverPassword')
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    className='bg-transparent hover:text-background'
                    size='icon'
                >
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
                </Button>
            </SheetTrigger>
            <SheetContent
                side='top'
                className='inset-x-auto !right-32 top-[calc(var(--header-top-height)+var(--header-height))] z-40 w-full max-w-[480px] p-14'
                overlayClassName='z-40'
            >
                <SheetHeader>
                    <SheetTitle className='text-center text-2xl'>
                        {authTitle[authState]}
                    </SheetTitle>
                </SheetHeader>
                {authView[authState]}
            </SheetContent>
        </Sheet>
    )
}
