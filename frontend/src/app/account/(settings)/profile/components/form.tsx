'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { withMask } from 'use-mask-input'
import { date, object, string, type infer as zodInfer } from 'zod'

import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input, inputVariants } from '@/components/ui/input'
import { PasswordWithReveal } from '@/components/ui/password-with-reveal'
import { useAuth } from '@/hooks/use-auth'
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
    date: date({
        required_error: 'Це поле є обов’язковим'
    })
})

type ContactsFormData = zodInfer<typeof profileSchema>

export const ProfileForm = () => {
    const { user } = useAuth()

    console.log(user)

    const form = useForm<ContactsFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            email: user?.email || '',
            phone_number: user?.phone_number || '',
            password: ''
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
                <div className='grid grid-cols-3 grid-rows-2 items-start gap-x-10 max-md:grid-cols-2 max-md:gap-x-5'>
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
                                <FormControl ref={withMask('+380 99 999 99 99')}>
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

                <div className='mt-10 max-lg:mx-auto max-lg:w-52'>
                    <Button
                        className='w-full'
                        size='lg'
                        variant='secondary'
                        type='submit'>
                        Зберегти
                    </Button>
                </div>
            </form>
        </Form>
    )
}
