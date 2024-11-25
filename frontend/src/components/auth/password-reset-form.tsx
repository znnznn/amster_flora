import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { object, string, type infer as zodInfer } from 'zod'

import { Button } from '../ui/button'
import { SheetHeader, SheetTitle } from '../ui/sheet'

import { resetPassword } from '@/api/passwords/passwords'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from './error-message'
import type { CurrentModal } from './modal'
import { SuccessMessage } from './success-message'

const passwordResetSchema = object({
    email: string()
        .min(1, {
            message: 'Це поле є обов’язковим'
        })
        .email({
            message: 'Це поле має відповідати формату email'
        })
})

type PasswordResetFormData = zodInfer<typeof passwordResetSchema>

interface PasswordResetFormProps {
    setCurrentModal: React.Dispatch<React.SetStateAction<CurrentModal>>
}

export const PasswordResetForm = ({ setCurrentModal }: PasswordResetFormProps) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const form = useForm<PasswordResetFormData>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: {
            email: ''
        }
    })

    const mutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            form.reset()
            setSuccessMessage('Ми надіслали посилання. Перевірте свою електронну пошту.')
        },
        onError: (error: any) => {
            setErrorMessage(error.message)
        }
    })

    const onSubmit = (data: PasswordResetFormData) => {
        mutation.mutate(data.email)
        setErrorMessage('')
        setSuccessMessage('')
    }

    return (
        <>
            <SheetHeader>
                <SheetTitle className='text-center text-2xl text-accent'>
                    Відновити пароль
                </SheetTitle>
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

                    <Button
                        className='w-full'
                        size='lg'
                        variant='secondary'
                        type='submit'>
                        {mutation.isLoading ? <Loader2 /> : 'Надіслати'}
                    </Button>
                    <ErrorMessage message={errorMessage} />
                    <SuccessMessage message={successMessage} />

                    <Button
                        onClick={() => setCurrentModal('phone-password-reset')}
                        type='button'
                        variant='link'
                        className='text-lg text-accent'>
                        Відновити через телефон
                    </Button>
                    <Button
                        onClick={() => setCurrentModal('login')}
                        type='button'
                        variant='link'
                        className='text-lg text-accent'>
                        Я згадав пароль
                    </Button>
                </form>
            </Form>
        </>
    )
}
