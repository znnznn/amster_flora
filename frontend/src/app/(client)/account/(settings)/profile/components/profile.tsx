'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { object, string, type infer as zodInfer } from 'zod'

import { editUser } from '@/api/users/users'
import { ErrorFormMessage, SuccessFormMessage } from '@/components/form-messages'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { emailShape } from '@/config/schemas'
import { useAuth } from '@/hooks/use-auth'

const profileSchema = object({
    first_name: string({
        required_error: 'Це поле є обов’язковим'
    }).min(1, {
        message: 'Це поле є обов’язковим'
    }),
    last_name: string({
        required_error: 'Це поле є обов’язковим'
    }).min(1, {
        message: 'Це поле є обов’язковим'
    }),
    email: emailShape,
    phone_number: string({
        required_error: 'Це поле є обов’язковим'
    }).min(1, {
        message: 'Це поле є обов’язковим'
    })
    // date: date({
    //     required_error: 'Це поле є обов’язковим'
    // })
})

type ProfileFormData = zodInfer<typeof profileSchema>

export const Profile = () => {
    const { user } = useAuth()

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            email: user?.email || '',
            phone_number: user?.phone_number || ''
        }
    })

    const mutation = useMutation({
        mutationFn: (payload: ProfileFormData) =>
            editUser(user.id, {
                ...payload,
                phone_number: payload.phone_number.replace(/\s/g, '')
            })
    })

    const onSubmit = (data: ProfileFormData) => {
        mutation.mutate(data)
    }

    return (
        <div>
            <h2 className='text-2xl font-medium'>Персональні дані</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-8 w-full'>
                    <div className='grid grid-cols-3 grid-rows-2 items-start gap-x-10 gap-y-4 max-md:grid-cols-2 max-md:gap-x-5'>
                        <FormField
                            control={form.control}
                            name='first_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            variant='underline'
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
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            variant='underline'
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
                                        <PhoneInput
                                            maxLength={16}
                                            variant='underline'
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
                                            placeholder='Прізвище'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* <FormField
                            control={form.control}
                            name='date'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <DatePicker
                                            className={cn(
                                                'justify-start rounded-none border-x-0 border-t-0 hover:bg-transparent',
                                                inputVariants({ variant: 'underline' })
                                            )}
                                            date={field.value}
                                            setDate={field.onChange}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </div>

                    {mutation.isError ? <ErrorFormMessage /> : null}
                    {mutation.isSuccess ? (
                        <SuccessFormMessage message='Дані змінено успішно' />
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
