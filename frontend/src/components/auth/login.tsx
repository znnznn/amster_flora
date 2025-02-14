'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { PasswordWithReveal } from '../ui/password-with-reveal'

import type { State } from './auth-popup'
import { SocialsButtons } from './socials-buttons'
import type { LoginCredentials } from '@/api/auth/auth-types'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { passwordShape } from '@/config/schemas'

interface SocialsButtonsProps {
    setAuthState: (authState: State) => void
}
const loginSchema = z.object({
    password: passwordShape.password,
    email: z.string().email().min(1, 'Введіть адресу електронної пошти')
})

export const Login = ({ setAuthState }: SocialsButtonsProps) => {
    const t = useTranslations('Common.Auth')

    const form = useForm<LoginCredentials>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(loginSchema)
    })

    const onLogin = (data: LoginCredentials) => {
        console.log(data)
    }

    return (
        <div className='space-y-6'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onLogin)}
                    className='space-y-4'
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder='E-mail'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordWithReveal {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <button
                        type='button'
                        className='mx-auto w-full py-2 text-center text-sm leading-snug text-accent hover:text-background'
                        onClick={() => setAuthState('forgot-password')}
                    >
                        {t('ForgotPassword')}
                    </button>{' '}
                    <Button
                        className='w-full text-xl'
                        variant='accent'
                        type='submit'
                    >
                        {t('Login')}
                    </Button>
                </form>
            </Form>
            <div className='flex flex-col items-center justify-center gap-y-1'>
                <span className='text-sm text-background'>{t('DoNotHaveAccount')}</span>
                <button
                    className='text-lg font-medium leading-snug text-accent hover:text-background'
                    onClick={() => setAuthState('sign-up')}
                >
                    {t('CreateAccount')}
                </button>
            </div>
            <SocialsButtons />
        </div>
    )
}
