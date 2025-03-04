'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useUpdateUser } from '@/api/users'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/providers/auth-provider'

const profileSchema = z.object({
    first_name: z
        .string({
            required_error: 'Це поле є обов’язковим'
        })
        .min(1, {
            message: 'Це поле є обов’язковим'
        }),
    last_name: z
        .string({
            required_error: 'Це поле є обов’язковим'
        })
        .min(1, {
            message: 'Це поле є обов’язковим'
        }),
    email: z
        .string({
            required_error: 'Це поле є обов’язковим'
        })
        .email({
            message: 'Це поле має відповідати формату email'
        })
        .min(1, {
            message: 'Це поле є обов’язковим'
        }),
    phone_number: z
        .string({
            required_error: 'Це поле є обов’язковим'
        })
        .min(1, {
            message: 'Це поле є обов’язковим'
        })
    // password: z
    //     .string({
    //         required_error: 'Це поле є обов’язковим'
    //     })
    //     .min(1, {
    //         message: 'Це поле є обов’язковим'
    //     }),
    // date: z.date({
    //     required_error: 'Це поле є обов’язковим'
    // })
})

export const ProfileForm = () => {
    const { user, isLoading } = useAuthContext()

    const form = useForm<z.infer<typeof profileSchema>>({
        defaultValues: {
            email: user?.email || '',
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            phone_number: user?.phone_number || ''
        },
        resolver: zodResolver(profileSchema)
    })

    const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser({
        onSuccess: () => {
            toast.success('Персональні дані успішно змінено')
        }
    })

    const onProfileChangeSubmit = (formData: any) => {
        updateUser({ id: user?.id!, payload: formData })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onProfileChangeSubmit)}
                className='mt-8'
            >
                <div className='grid grid-cols-2 items-center gap-x-4 gap-y-3 md:grid-cols-3 md:gap-x-10'>
                    <FormField
                        control={form.control}
                        name='first_name'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        variant='underline'
                                        disabled={isLoading || isUpdating}
                                        placeholder="Ім'я"
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
                            <FormItem>
                                <FormControl>
                                    <Input
                                        variant='underline'
                                        disabled={isLoading || isUpdating}
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
                        name='phone_number'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        variant='underline'
                                        disabled={isLoading || isUpdating}
                                        type='tel'
                                        inputMode='tel'
                                        placeholder='Телефон'
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
                                        variant='underline'
                                        disabled={isLoading || isUpdating}
                                        placeholder='Прізвище'
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='max-sm:flex max-sm:justify-center'>
                    <Button
                        disabled={isUpdating}
                        className='mx-auto mt-10 w-60 sm:w-40'
                        size='lg'
                        variant='accent'
                        type='submit'
                    >
                        {isUpdating ? <Loader2 className='animate-spin' /> : 'Зберегти'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
