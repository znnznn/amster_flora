'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { PasswordWithReveal } from '../ui/password-with-reveal'

import type { State } from './auth-popup'
import { SocialsButtons } from './socials-buttons'
import type { LoginCredentials } from '@/api/auth/auth-types'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormSubmissionMessage
} from '@/components/ui/form'
import { passwordShape } from '@/config/schemas'
import { useAuthContext } from '@/providers/auth-provider'

interface SocialsButtonsProps {
    setAuthState: (authState: State) => void
}
const loginSchema = z.object({
    password: passwordShape.password,
    email: z.string().email().min(1, 'Введіть адресу електронної пошти')
})

export const Login = ({ setAuthState }: SocialsButtonsProps) => {
    const t = useTranslations('Common')

    const { login } = useAuthContext()

    const form = useForm<LoginCredentials>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(loginSchema)
    })

    const onLogin = (data: LoginCredentials) => {
        try {
            login.mutate(data)
        } catch {
            toast.error(t('Errors.Auth.Login.Title'), {
                description: t('Errors.Auth.Login.Description')
            })
        }
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
                        onClick={() => setAuthState('forgot-password-mail')}
                    >
                        {t('Auth.ForgotPassword')}
                    </button>{' '}
                    <Button
                        className='w-full text-xl'
                        variant='accent'
                        type='submit'
                    >
                        {login.isLoading ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            t('Auth.Login')
                        )}
                    </Button>
                </form>
                {login.isError ? (
                    <FormSubmissionMessage
                        message={t('Errors.Auth.Login.Description')}
                        variant='destructive'
                    />
                ) : null}
            </Form>
            <div className='flex flex-col items-center justify-center gap-y-1'>
                <span className='text-sm text-background'>
                    {t('Auth.DoNotHaveAccount')}
                </span>
                <button
                    className='text-lg font-medium leading-snug text-accent hover:text-background'
                    onClick={() => setAuthState('sign-up')}
                >
                    {t('Auth.CreateAccount')}
                </button>
            </div>
            <SocialsButtons />
        </div>
    )
}
