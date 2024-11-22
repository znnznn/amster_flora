'use client'

import { UserRound } from 'lucide-react'
import { useState } from 'react'

import { LoginForm } from './login-form'
import { PasswordResetForm } from './password-reset-form'
import { PhonePasswordResetForm } from './phone-password-reset-form'
import { RegistrationForm } from './registration-form'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export type CurrentModal =
    | 'login'
    | 'password-reset'
    | 'register'
    | 'phone-password-reset'

interface AuthModalProps extends React.HTMLAttributes<HTMLButtonElement> {
    withText?: boolean
}
export const AuthModal = ({ withText = false, className }: AuthModalProps) => {
    const [currentModal, setCurrentModal] = useState<CurrentModal>('login')

    const [isSheetOpen, setIsSheetOpen] = useState(false)

    return (
        <Sheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}>
            <SheetTrigger
                className={cn(
                    'flex items-center gap-x-2 p-1 transition-colors hover:text-background',
                    className
                )}>
                <UserRound className='size-6' />{' '}
                <span className={withText ? '' : 'hidden'}>Особистий кабінет</span>
            </SheetTrigger>
            <SheetContent
                className='inset-x-auto right-20 w-[440px] rounded-b-3xl border border-t-0 border-accent px-12'
                side='top'>
                {currentModal === 'login' ? (
                    <LoginForm
                        setCurrentModal={setCurrentModal}
                        setIsSheetOpen={setIsSheetOpen}
                    />
                ) : currentModal === 'password-reset' ? (
                    <PasswordResetForm setCurrentModal={setCurrentModal} />
                ) : currentModal === 'phone-password-reset' ? (
                    <PhonePasswordResetForm
                        setCurrentModal={setCurrentModal}
                        setIsSheetOpen={setIsSheetOpen}
                    />
                ) : (
                    <RegistrationForm
                        setCurrentModal={setCurrentModal}
                        setSheetOpen={setIsSheetOpen}
                    />
                )}
            </SheetContent>
        </Sheet>
    )
}
