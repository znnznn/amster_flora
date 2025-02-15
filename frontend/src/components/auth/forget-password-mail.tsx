'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

import type { State } from './auth-popup'
import type { Email } from '@/api/auth/auth-types'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

interface SocialsButtonsProps {
    setAuthState: (authState: State) => void
}
const forgetPasswordMailSchema = z.object({
    email: z.string().email().min(1, 'Введіть адресу електронної пошти')
})

export const ForgetPasswordMail = ({ setAuthState }: SocialsButtonsProps) => {
    const t = useTranslations('Common.Auth')

    const form = useForm<Email>({
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(forgetPasswordMailSchema)
    })

    const onForgetPasswordMail = (data: Email) => {
        console.log(data)
    }

    return (
        <div className='space-y-6'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onForgetPasswordMail)}
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
                    <Button
                        className='w-full text-xl'
                        variant='accent'
                        type='submit'
                    >
                        {t('Send')}
                    </Button>
                </form>
            </Form>
            <button
                className='w-full py-1 text-center text-sm leading-snug text-accent hover:text-background'
                onClick={() => setAuthState('login')}
            >
                {t('IRememberPassword')}
            </button>
        </div>
    )
}
