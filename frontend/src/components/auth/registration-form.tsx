import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useMutation } from 'react-query'
import { object, string, type infer as zodInfer } from 'zod'

import { SocialsButtons } from '../socials-buttons'
import { PasswordWithReveal } from '../ui/password-with-reveal'
import { PhoneInput } from '../ui/phone-input'
import { SheetHeader, SheetTitle } from '../ui/sheet'

import { ErrorMessage } from './error-message'
import type { CurrentModal } from './modal'
import { signUp } from '@/api/auth/auth'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { emailShape, passwordShape } from '@/config/schemas'

const registrationSchema = object({
    password: passwordShape,
    phone_number: string().refine((value) => isValidPhoneNumber(value), {
        message: 'Неправильний формат номеру телефону'
    }),
    email: emailShape,
    first_name: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    last_name: string().min(1, {
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
            phone_number: '',
            email: '',
            first_name: '',
            last_name: '',
            password: ''
        }
    })

    const mutation = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            form.reset()
            setSheetOpen(false)
        },
        onError: (error: any) => {
            setErrorMessage(error.response?.data?.detail || 'Помилка реєстрації')
        }
    })

    const onSubmit = (data: RegistrationFormData) => {
        mutation.mutate(data)
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
                                <FormControl>
                                    <PhoneInput {...field} />
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
                        name='last_name'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <Input
                                        placeholder='Прізвище'
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
