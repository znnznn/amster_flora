'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { object, string, type infer as zodInfer } from 'zod'

import { SocialsButtons } from '@/components/socials-buttons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { useAuth } from '@/hooks/use-auth'

const loginSchema = object({
    username: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    phone: string().min(1, {
        message: 'Це поле є обов’язковим'
    })
})

type LoginFormData = zodInfer<typeof loginSchema>

export const DiscountModal = () => {
    const { user } = useAuth()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            phone: ''
        }
    })

    const onSubmit = (data: LoginFormData) => {
        console.log(data)
    }
    const defaultOpen = user ? user.last_login !== null : false

    return (
        <Dialog defaultOpen={defaultOpen}>
            <DialogContent className='px-12'>
                <DialogHeader>
                    <DialogTitle>Зареєструйся та отримай -5%</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='mt-4 flex flex-col items-center gap-y-4'>
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input
                                            placeholder='Ваше ім’я'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <PhoneInput {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className='mx-auto mt-4'
                            size='lg'
                            variant='secondary'
                            type='submit'>
                            Зареєструватись
                        </Button>
                    </form>
                </Form>
                <p className='mt-6 text-sm text-accent'>
                    Надсилаючи цю форму, ви погоджуєтесь з нашою <br />
                    <Link
                        className='underline underline-offset-2 transition-colors hover:text-background'
                        href='/privacy-policy'>
                        Політикою конфіденційності
                    </Link>{' '}
                    та{' '}
                    <Link
                        className='underline underline-offset-2 transition-colors hover:text-background'
                        href='/terms-of-use'>
                        Умовами використання.
                    </Link>
                </p>

                <SocialsButtons className='mt-6 text-background' />
            </DialogContent>
        </Dialog>
    )
}
