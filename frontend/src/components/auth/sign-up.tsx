'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { PasswordWithReveal } from '../ui/password-with-reveal'
import { PhoneInput } from '../ui/phone-input'

import type { State } from './auth-popup'
import { SocialsButtons } from './socials-buttons'
import type { UserPayload } from '@/api/users/user-types'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { passwordShape } from '@/config/schemas'

interface SocialsButtonsProps {
    setAuthState: (authState: State) => void
}
const loginSchema = z.object({
    password: passwordShape.password,
    email: z.string().email().min(1, 'Введіть адресу електронної пошти'),
    phone_number: z.string().min(1, ''),
    first_name: z.string().min(1, ''),
    last_name: z.string().min(1, '')
})

export const SignUp = ({ setAuthState }: SocialsButtonsProps) => {
    const t = useTranslations('Common')

    // const { signUp } = useAuth()

    const form = useForm<UserPayload>({
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            password: ''
        },
        resolver: zodResolver(loginSchema)
    })

    const onLogin = (formData: UserPayload) => {
        // signUp
        //     .mutateAsync({
        //         ...formData,
        //         phone_number: formData.phone_number.replaceAll(' ', '')
        //     })
        //     .then(() => {
        //         setAuthState('login')
        //         toast.success(t('Auth.SignUpSuccess'))
        //     })
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
                        name='phone_number'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PhoneInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex items-center gap-4'>
                        <FormField
                            control={form.control}
                            name='first_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder={t('Placeholders.Name')}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='last_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder={t('Placeholders.Surname')}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
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
                        {t('Auth.SignUp')}
                    </Button>
                </form>
            </Form>
            <div className='flex flex-col items-center justify-center gap-y-1'>
                <span className='text-sm text-background'>{t('Auth.HaveAccount')}</span>
                <button
                    className='text-lg font-medium leading-snug text-accent hover:text-background'
                    onClick={() => setAuthState('login')}
                >
                    {t('Auth.Login')}
                </button>
            </div>
            <SocialsButtons />
        </div>
    )
}
