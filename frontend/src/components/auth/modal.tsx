'use client'

import { UserRound } from 'lucide-react'
import { useState } from 'react'

import { LoginForm } from './login-form'
import { PasswordResetForm } from './password-reset-form'
import { PhonePasswordResetForm } from './phone-password-reset-form'
import { RegistrationForm } from './registration-form'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export type CurrentModal =
    | 'login'
    | 'password-reset'
    | 'register'
    | 'phone-password-reset'

export const AuthModal = () => {
    const [currentModal, setCurrentModal] = useState<CurrentModal>('login')

    const [isSheetOpen, setIsSheetOpen] = useState(false)

    return (
        <Sheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}>
            <SheetTrigger className='p-1 transition-colors hover:text-background'>
                <UserRound className='size-6' />
            </SheetTrigger>
            <SheetContent
                className='inset-x-auto right-20 w-[440px] rounded-b-3xl border border-t-0 border-accent px-12'
                side='top'>
                {currentModal === 'login' ? (
                    <LoginForm setCurrentModal={setCurrentModal} />
                ) : currentModal === 'password-reset' ? (
                    <PasswordResetForm setCurrentModal={setCurrentModal} />
                ) : currentModal === 'phone-password-reset' ? (
                    <PhonePasswordResetForm setCurrentModal={setCurrentModal} />
                ) : (
                    <RegistrationForm setCurrentModal={setCurrentModal} />
                )}
            </SheetContent>
        </Sheet>
    )
}
