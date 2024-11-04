'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { withMask } from 'use-mask-input'
import { object, string, type infer as zodInfer } from 'zod'

import { SocialsButtons } from '../socials-buttons'
import { PasswordWithReveal } from '../ui/password-with-reveal'
import { SheetHeader, SheetTitle } from '../ui/sheet'

import { ErrorMessage } from './error-message'
import type { CurrentModal } from './modal'
import { credintialsLogin } from '@/api/auth/auth'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const loginSchema = object({
    password: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    phone: string().min(1, {
        message: 'Це поле є обов’язковим'
    })
})

type LoginFormData = zodInfer<typeof loginSchema>

interface LoginFormProps {
    setCurrentModal: React.Dispatch<React.SetStateAction<CurrentModal>>
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginForm = ({ setCurrentModal, setIsSheetOpen }: LoginFormProps) => {
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            password: '',
            phone: ''
        }
    })

    const mutation = useMutation({
        mutationFn: credintialsLogin,
        onSuccess: () => {
            form.reset()
            setIsSheetOpen(false)
            router.refresh()
        },
        onError: (error: any) => {
            setErrorMessage(error.message)
        }
    })

    const onSubmit = (data: LoginFormData) => {
        mutation.mutate(data)
    }

    return (
        <>
            <SheetHeader>
                <SheetTitle className='text-center text-[28px] text-accent'>
                    Вхід
                </SheetTitle>
            </SheetHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-4 flex flex-col items-center gap-y-4'>
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl
                                    ref={withMask('+380 99 999 99 99', {
                                        inputmode: 'tel'
                                    })}>
                                    <Input
                                        type='tel'
                                        inputMode='tel'
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
                        {mutation.isLoading ? <Loader2 /> : 'Увійти'}
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
                    <SocialsButtons setIsSheetOpen={setIsSheetOpen} />
                </form>
            </Form>
        </>
    )
}
