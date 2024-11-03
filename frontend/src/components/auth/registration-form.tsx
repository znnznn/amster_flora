import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { withMask } from 'use-mask-input'
import { object, string, type infer as zodInfer } from 'zod'

import { SocialsButtons } from '../socials-buttons'
import { SheetHeader, SheetTitle } from '../ui/sheet'

import type { CurrentModal } from './modal'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const registrationSchema = object({
    password: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    phone: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    email: string()
        .min(1, {
            message: 'Це поле є обов’язковим'
        })
        .email({
            message: 'Це поле має відповідати формату email'
        }),
    username: string().min(1, {
        message: 'Це поле є обов’язковим'
    })
})

type RegistrationFormData = zodInfer<typeof registrationSchema>

interface RegistrationFormProps {
    setCurrentModal: React.Dispatch<React.SetStateAction<CurrentModal>>
}

export const RegistrationForm = ({ setCurrentModal }: RegistrationFormProps) => {
    const form = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            password: '',
            phone: ''
        }
    })

    const onSubmit = (data: RegistrationFormData) => {
        console.log(data)
    }
    return (
        <>
            <SheetHeader>
                <SheetTitle className='text-center text-[28px] text-accent'>
                    Реєстрація
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
                        name='username'
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
                        name='password'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='Пароль'
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

                    <Button
                        className='w-full'
                        size='lg'
                        variant='secondary'
                        type='submit'>
                        Зареєструватися
                    </Button>
                    <SocialsButtons />

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
