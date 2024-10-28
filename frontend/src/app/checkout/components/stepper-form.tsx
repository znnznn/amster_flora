'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { object, string, type infer as zodInfer } from 'zod'

import { SocialsButtons } from '@/components/socials-buttons'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const checkoutSchema = object({
    username: string().min(1, {
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
    city: string().min(1, {
        message: 'Це поле є обов’язковим'
    })
})

type CheckoutFormValues = zodInfer<typeof checkoutSchema>

export const StepperForm = () => {
    const [step, setStep] = useState(1)

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            username: '1',
            phone: '2',
            city: '4',
            email: '5'
        }
    })
    const { phone, city, username } = form.watch()

    const handleCheckout = (values: CheckoutFormValues) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleCheckout)}
                className='w-full space-y-4'>
                <div className='w-full rounded-3xl border p-6'>
                    <h2
                        className={cn(
                            'text-[22px] font-medium text-primary transition-opacity',
                            step === 1 ? '' : 'opacity-25'
                        )}>
                        Ваші дані
                    </h2>
                    {step === 1 ? (
                        <div className='mt-4 space-y-4'>
                            <div className='flex items-center gap-x-4'>
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
                                                <Input
                                                    type='tel'
                                                    inputMode='tel'
                                                    placeholder='+380679999569'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='flex items-center gap-x-4'>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormControl>
                                                <Input
                                                    inputMode='email'
                                                    type='email'
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
                                    name='phone'
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormControl>
                                                <Input
                                                    type='tel'
                                                    inputMode='tel'
                                                    placeholder='+380679999569'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center gap-y-6'>
                                <Button
                                    size='lg'
                                    variant='secondary'
                                    onClick={() => setStep(2)}
                                    disabled={!phone || !username}
                                    className='mx-auto mt-8 w-96'
                                    type='button'>
                                    Продовжити
                                </Button>

                                <div className='flex flex-col items-center gap-y-2'>
                                    <span>Увійти за допомогою</span>
                                    <SocialsButtons />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className='w-full rounded-3xl border p-6'>
                    <h2
                        className={cn(
                            'text-[22px] font-medium text-primary transition-opacity',
                            step === 2 ? '' : 'opacity-25'
                        )}>
                        Доставка
                    </h2>
                    {step === 2 ? (
                        <FormField
                            control={form.control}
                            name='city'
                            render={({ field }) => (
                                <>
                                    <FormItem className='mt-4'>
                                        <FormControl>
                                            <Input
                                                type='tel'
                                                inputMode='tel'
                                                placeholder='+380679999569'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    <div className='mt-4 flex items-center gap-x-4'>
                                        <Button
                                            size='lg'
                                            className='flex-1'
                                            onClick={() => setStep(3)}
                                            disabled={!city}
                                            type='button'>
                                            Продовжити
                                        </Button>
                                        <Button
                                            size='lg'
                                            className='flex-1'
                                            variant='outline'
                                            onClick={() => setStep(1)}
                                            type='button'>
                                            Назад
                                        </Button>
                                    </div>
                                </>
                            )}
                        />
                    ) : (
                        ''
                    )}
                </div>

                <div className='w-full rounded-3xl border p-6'>
                    <h2
                        className={cn(
                            'text-[22px] font-medium text-primary transition-opacity',
                            step === 3 ? '' : 'opacity-25'
                        )}>
                        Оплата
                    </h2>

                    {step === 3 ? (
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <>
                                    <FormItem className='mt-4'>
                                        <FormControl>
                                            <Input
                                                type='tel'
                                                inputMode='tel'
                                                placeholder='+380679999569'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    <div className='mt-4 flex items-center gap-x-4'>
                                        <Button
                                            size='lg'
                                            className='flex-1'
                                            disabled={!city}
                                            type='submit'>
                                            Замовити
                                        </Button>
                                        <Button
                                            size='lg'
                                            className='flex-1'
                                            variant='secondary'
                                            onClick={() => setStep(2)}
                                            type='button'>
                                            Назад
                                        </Button>
                                    </div>
                                </>
                            )}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </form>
        </Form>
    )
}
