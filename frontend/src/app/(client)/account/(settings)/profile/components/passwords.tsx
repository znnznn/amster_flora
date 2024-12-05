'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z, type infer as zodInfer } from 'zod'

import { changePassword } from '@/api/passwords/passwords'
import { ErrorFormMessage, SuccessFormMessage } from '@/components/form-messages'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { PasswordWithReveal } from '@/components/ui/password-with-reveal'
import { passwordShape } from '@/config/schemas'
import { useAuth } from '@/hooks/use-auth'

const changePasswordSchema = z
    .object({
        old_password: passwordShape,
        new_password1: passwordShape,
        new_password2: z.string().min(1, 'Підтвердження паролю є обов’язковим')
    })
    .refine((data) => data.new_password1 === data.new_password2, {
        message: 'Паролі не співпадають',
        path: ['new_password2']
    })

type PasswordsFormData = zodInfer<typeof changePasswordSchema>

export const Passwords = () => {
    const { user } = useAuth()
    const form = useForm<PasswordsFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            old_password: '',
            new_password1: '',
            new_password2: ''
        }
    })

    const mutation = useMutation({
        mutationFn: (payload: PasswordsFormData) => changePassword(user.id, payload)
    })

    const onSubmit = (data: PasswordsFormData) => {
        mutation.mutate(data)
    }

    return (
        <div>
            <h2 className='text-2xl font-medium'>Зміна паролю</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-8 w-full'>
                    <div className='grid grid-cols-3 items-start gap-x-10 gap-y-4 max-md:grid-cols-2 max-md:gap-x-5'>
                        <FormField
                            control={form.control}
                            name='old_password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PasswordWithReveal
                                            variant='underline'
                                            placeholder='Старий пароль'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='new_password1'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PasswordWithReveal
                                            variant='underline'
                                            placeholder='Новий пароль'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='new_password2'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PasswordWithReveal
                                            variant='underline'
                                            placeholder='Підтвердіть новий пароль'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {mutation.isError ? <ErrorFormMessage /> : null}
                    {mutation.isSuccess ? (
                        <SuccessFormMessage message='Пароль змінено успішно' />
                    ) : null}

                    <div className='mt-10 flex justify-center md:justify-start'>
                        <Button
                            disabled={mutation.isLoading}
                            size='lg'
                            className='w-44'
                            variant='secondary'
                            type='submit'>
                            {mutation.isLoading ? (
                                <Loader2 className='animate-spin' />
                            ) : (
                                'Зберегти'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
