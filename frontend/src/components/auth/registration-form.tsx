import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { withMask } from 'use-mask-input'
import { object, string, type infer as zodInfer } from 'zod'

import { SocialsButtons } from '../socials-buttons'
import { PasswordWithReveal } from '../ui/password-with-reveal'
import { SheetHeader, SheetTitle } from '../ui/sheet'

import { register } from '@/api/auth/auth'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from './error-message'
import type { CurrentModal } from './modal'

const registrationSchema = object({
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
    phone_number: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    email: string()
        .min(1, {
            message: 'Це поле є обов’язковим'
        })
        .email({
            message: 'Це поле має відповідати формату email'
        }),
    first_name: string().min(1, {
        message: 'Це поле є обов’язковим'
    })
})

type RegistrationFormData = zodInfer<typeof registrationSchema>

interface RegistrationFormProps {
    setCurrentModal: React.Dispatch<React.SetStateAction<CurrentModal>>
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const RegistrationForm = ({
    setCurrentModal,
    setSheetOpen
}: RegistrationFormProps) => {
    const [errorMessage, setErrorMessage] = useState('')

    const form = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            password: '',
            phone_number: ''
        }
    })

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            form.reset()
            setSheetOpen(false)
        },
        onError: (error: any) => {
            setErrorMessage(error.message)
        }
    })

    const onSubmit = (data: RegistrationFormData) => {
        mutation.mutate({
            ...data,
            role: 'client',
            last_name: data.first_name
        })
    }
    return (
        <>
            <SheetHeader>
                <SheetTitle className='text-center text-2xl text-accent'>
                    Реєстрація
                </SheetTitle>
            </SheetHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-4 flex flex-col items-center gap-y-4'>
                    <FormField
                        control={form.control}
                        name='phone_number'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl ref={withMask('+380 99 999 99 99')}>
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
                        name='first_name'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <Input
                                        placeholder='Ім’я'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <Input
                                        type='email'
                                        inputMode='email'
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
                            <FormItem className='w-full'>
                                <FormControl>
                                    <PasswordWithReveal {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className='w-full'
                        size='lg'
                        variant='secondary'
                        type='submit'>
                        {mutation.isLoading ? <Loader2 /> : 'Зареєструватися'}
                    </Button>

                    <ErrorMessage message={errorMessage} />

                    <SocialsButtons className='text-background' />

                    <div className='mt-2'>
                        <div className='text-center text-sm text-background'>
                            Вже є акаунт?
                        </div>
                        <Button
                            onClick={() => setCurrentModal('login')}
                            type='button'
                            variant='link'
                            className='text-lg font-medium text-accent'>
                            Увійти
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
