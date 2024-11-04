'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { date, object, string, type infer as zodInfer } from 'zod'

import type { User } from '@/api/users/users.types'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input, inputVariants } from '@/components/ui/input'
import { PasswordWithReveal } from '@/components/ui/password-with-reveal'
import { cn } from '@/lib/utils'

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
    email: string({
        required_error: 'Це поле є обов’язковим'
    })
        .email({
            message: 'Це поле має відповідати формату email'
        })
        .min(1, {
            message: 'Це поле є обов’язковим'
        }),
    phone_number: string({
        required_error: 'Це поле є обов’язковим'
    }).min(1, {
        message: 'Це поле є обов’язковим'
    }),
    password: string({
        required_error: 'Це поле є обов’язковим'
    }).min(1, {
        message: 'Це поле є обов’язковим'
    }),
    date: date({
        required_error: 'Це поле є обов’язковим'
    })
})

type ContactsFormData = zodInfer<typeof profileSchema>

export const ProfileForm = () => {
    const currentUser = JSON.parse(
        document.cookie
            .split('; ')
            .find((cookie) => cookie.startsWith('user='))
            ?.split('=')[1] || ''
    ) as User

    // const [currentDate] = useState(new Date())

    const form = useForm<ContactsFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email,
            phone_number: currentUser.phone_number,
            password: '',
            date: '' as any
        }
    })

    const onSubmit = (data: ContactsFormData) => {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='mt-8 w-full'>
                <div className='grid grid-cols-3 items-center gap-x-10'>
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
                                    <Input
                                        variant='underline'
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
                </div>
                <div className='mt-5 grid grid-cols-3 items-center gap-x-10'>
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
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordWithReveal
                                        {...field}
                                        variant='underline'
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
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
                    />
                </div>
                <Button
                    className='mt-10'
                    size='lg'
                    variant='secondary'
                    type='submit'>
                    Зберегти
                </Button>
            </form>
        </Form>
    )
}
