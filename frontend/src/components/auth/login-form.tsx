'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { object, string, type infer as zodInfer } from 'zod'

import { SocialsButtons } from '../socials-buttons'
import { PasswordWithReveal } from '../ui/password-with-reveal'
import { SheetHeader, SheetTitle } from '../ui/sheet'

import { ErrorMessage } from './error-message'
import type { CurrentModal } from './modal'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'

const loginSchema = object({
    password: string({
        required_error: "Це поле є обов'язковим"
    })
        .min(1, "Це поле є обов'язковим")
        .min(8, 'Пароль повинен містити не менше 8 символів')
        .regex(/[a-z]/, 'Пароль повинен містити не менше однієї малої літери')
        .regex(/[A-Z]/, 'Пароль повинен містити не менше однієї великої літери')
        .regex(/[0-9]/, 'Пароль повинен містити не менше однієї цифри')
        .regex(
            /[!@#$%^&*]/,
            'Пароль повинен містити не менше одного спеціального символу (!@#$%^&*)'
        ),
    email: string().min(1, {
        message: 'Це поле є обов’язковим'
    })
})

type LoginFormData = zodInfer<typeof loginSchema>

interface LoginFormProps {
    setCurrentModal: React.Dispatch<React.SetStateAction<CurrentModal>>
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginForm = ({ setCurrentModal, setIsSheetOpen }: LoginFormProps) => {
    const { login, isLoginLoading, errorMessage } = useAuth()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            password: '',
            email: ''
        }
    })

    const onSubmit = (data: LoginFormData) => {
        try {
            login(data).then(() => {
                setIsSheetOpen(false)
                form.reset()
            })
        } catch {}
    }

    return (
        <>
            <SheetHeader>
                <SheetTitle className='text-center text-2xl text-accent'>Вхід</SheetTitle>
            </SheetHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-4 flex flex-col items-center gap-y-4'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl
                                // ref={withMask('+380 99 999 99 99', {
                                //     inputmode: 'tel'
                                // })}
                                >
                                    <Input
                                        type='email'
                                        inputMode='email'
                                        placeholder='+380 068 777 88 93'
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
                            <FormItem className='w-full'>
                                <FormControl>
                                    <PasswordWithReveal {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        onClick={() => setCurrentModal('password-reset')}
                        type='button'
                        variant='link'
                        className='text-sm text-accent underline'>
                        Забули пароль?
                    </Button>
                    <Button
                        className='w-full'
                        size='lg'
                        variant='secondary'
                        type='submit'>
                        {isLoginLoading ? <Loader2 className='animate-spin' /> : 'Увійти'}
                    </Button>

                    <ErrorMessage message={errorMessage} />

                    <div className='mt-2'>
                        <div className='text-center text-sm text-background'>
                            Ще не зареєстровані?
                        </div>
                        <Button
                            onClick={() => setCurrentModal('register')}
                            type='button'
                            variant='link'
                            className='text-lg font-medium text-accent'>
                            Створити акаунт
                        </Button>
                    </div>
                    <SocialsButtons
                        className='text-background'
                        setIsSheetOpen={setIsSheetOpen}
                    />
                </form>
            </Form>
        </>
    )
}
