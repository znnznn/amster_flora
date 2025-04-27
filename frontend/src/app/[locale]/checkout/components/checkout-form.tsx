'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { SocialsButtons } from '@/components/auth/socials-buttons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PhoneInput } from '@/components/ui/phone-input'
import { useAuth } from '@/providers/auth-provider'

const paymentOptions = [
    { id: 'cash', label: 'Готівка' },
    { id: 'way-for-pay', label: 'WayForPay' }
] as const

const STEP_TITLES = ['Ваші дані', 'Доставка', 'Оплата'] as const

const checkoutFormSchema = z.object({
    // Step 1
    username: z.string().min(1, { message: 'Це поле є обов’язковим' }),
    phone: z.string().min(1, { message: 'Це поле є обов’язковим' }),
    email: z
        .string()
        .min(1, { message: 'Це поле є обов’язковим' })
        .email({ message: 'Це поле має відповідати формату email' }),
    city: z.string().min(1, { message: 'Це поле є обов’язковим' }),
    // Step 2
    date: z.date({ required_error: 'Це поле є обов’язковим' }),
    time: z.date({ required_error: 'Це поле є обов’язковим' }),
    recipientName: z.string().min(1, { message: 'Це поле є обов’язковим' }),
    recipientPhone: z.string().min(1, { message: 'Це поле є обов’язковим' }),
    anonymous: z.boolean().default(false),
    shop: z.string().min(1, { message: 'Це поле є обов’язковим' }),
    house: z.string().min(1, { message: 'Це поле є обов’язковим' }),
    apartment: z.string().min(1, { message: 'Це поле є обов’язковим' }),
    street: z.string().min(1, { message: 'Це поле є обов’язковим' }),
    // Step 3
    paymentMethod: z.enum(['cash', 'way-for-pay'], {
        required_error: 'Ви маєте обрати спосіб оплати'
    }),
    call: z.boolean()
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>
type StepState = 'active' | 'completed' | 'empty'
type StepIndex = 0 | 1 | 2

export const CheckoutForm = () => {
    const [activeStep, setActiveStep] = useState<StepIndex>(2)
    const [completed, setCompleted] = useState<Record<StepIndex, boolean>>({
        0: false,
        1: false,
        2: false
    })

    const { user } = useAuth()

    const form = useForm<CheckoutFormValues>({
        defaultValues: {
            username: user?.first_name + ' ' + user?.last_name || '',
            phone: user?.phone_number || '',
            email: user?.email || '',
            city: '',
            date: undefined,
            time: undefined,
            recipientName: '',
            recipientPhone: '',
            anonymous: false,
            shop: '',
            house: '',
            apartment: '',
            street: '',
            paymentMethod: 'cash',
            call: false
        },
        resolver: zodResolver(checkoutFormSchema),
        mode: 'onTouched'
    })

    const validateStep = async (step: StepIndex) => {
        let stepSchema: z.ZodTypeAny
        if (step === 0) {
            stepSchema = z.object({
                username: checkoutFormSchema.shape.username,
                phone: checkoutFormSchema.shape.phone,
                email: checkoutFormSchema.shape.email,
                city: checkoutFormSchema.shape.city
            })
        } else if (step === 1) {
            stepSchema = z.object({
                date: checkoutFormSchema.shape.date,
                time: checkoutFormSchema.shape.time,
                recipientName: checkoutFormSchema.shape.recipientName,
                recipientPhone: checkoutFormSchema.shape.recipientPhone,
                anonymous: checkoutFormSchema.shape.anonymous,
                shop: checkoutFormSchema.shape.shop,
                house: checkoutFormSchema.shape.house,
                apartment: checkoutFormSchema.shape.apartment,
                street: checkoutFormSchema.shape.street
            })
        } else {
            stepSchema = z.object({
                paymentMethod: checkoutFormSchema.shape.paymentMethod,
                call: checkoutFormSchema.shape.call
            })
        }
        const result = await stepSchema.safeParseAsync(form.getValues())
        if (!result.success) {
            result.error.errors.forEach((err) => {
                form.setError(err.path[0] as keyof CheckoutFormValues, {
                    message: err.message
                })
            })
            return false
        }
        return true
    }

    const handleNext = async (step: StepIndex) => {
        const valid = await validateStep(step)
        if (!valid) return
        setCompleted((prev) => ({ ...prev, [step]: true }))
        if (step < 2) setActiveStep((prev) => (prev + 1) as StepIndex)
    }

    const handleEdit = (step: StepIndex) => {
        setActiveStep(step)
        setCompleted((prev) => ({ ...prev, [step]: false }))
    }

    const handleSubmit = (data: CheckoutFormValues) => {
        // eslint-disable-next-line no-console
        console.log(data)
    }

    return (
        <FormProvider {...form}>
            <Form {...form}>
                <form
                    className='w-full max-w-[700px] pl-20'
                    onSubmit={form.handleSubmit(handleSubmit)}
                    autoComplete='off'
                >
                    {[0, 1, 2].map((step) => {
                        let state: StepState = 'empty'
                        if (activeStep === step) state = 'active'
                        else if (completed[step as StepIndex]) state = 'completed'

                        return (
                            <div key={step}>
                                {state === 'active' && (
                                    <StepBlock
                                        step={step as StepIndex}
                                        onNext={() => handleNext(step as StepIndex)}
                                    />
                                )}
                                {state === 'completed' && (
                                    <StepSummary
                                        step={step as StepIndex}
                                        values={form.getValues()}
                                        onEdit={() => handleEdit(step as StepIndex)}
                                    />
                                )}
                                {state === 'empty' && (
                                    <StepEmpty step={step as StepIndex} />
                                )}
                            </div>
                        )
                    })}

                    {completed[0] && completed[1] && completed[2] && (
                        <Button
                            type='submit'
                            className='mt-8 w-2/3'
                            variant='accent'
                        >
                            Завершити
                        </Button>
                    )}
                </form>
            </Form>
        </FormProvider>
    )
}

const StepBlock: React.FC<{
    step: StepIndex
    onNext: () => void
}> = ({ step, onNext }) => {
    const form = useFormContext<CheckoutFormValues>()

    if (step === 0) {
        return (
            <div className='mt-8 flex flex-col items-center gap-6 rounded-3xl border p-6'>
                <h2 className='self-start text-xl font-medium'>{STEP_TITLES[step]}</h2>
                <div className='mt-6 grid grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
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
                            <FormItem>
                                <FormControl>
                                    <PhoneInput {...field} />
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
                        name='city'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder='Місто'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type='button'
                    className='w-2/3'
                    variant='accent'
                    onClick={onNext}
                >
                    Продовжити
                </Button>
                <SocialsButtons className='[&_span]:!text-primary' />
            </div>
        )
    }

    if (step === 1) {
        return (
            <div className='mt-8 flex flex-col items-center gap-6 rounded-3xl border p-6'>
                <h2 className='self-start text-xl font-medium'>{STEP_TITLES[step]}</h2>
                <div className='mt-6 grid grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='date'
                                        placeholder='Дата доставки'
                                        value={
                                            field.value
                                                ? field.value.toISOString().split('T')[0]
                                                : ''
                                        }
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value
                                                    ? new Date(e.target.value)
                                                    : undefined
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='time'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='time'
                                        placeholder='Час доставки'
                                        value={
                                            field.value
                                                ? field.value.toLocaleTimeString(
                                                      'en-GB',
                                                      {
                                                          hour: '2-digit',
                                                          minute: '2-digit'
                                                      }
                                                  )
                                                : ''
                                        }
                                        onChange={(e) => {
                                            const [hours, minutes] =
                                                e.target.value.split(':')
                                            if (hours && minutes) {
                                                const date = new Date()
                                                date.setHours(Number(hours))
                                                date.setMinutes(Number(minutes))
                                                date.setSeconds(0)
                                                field.onChange(date)
                                            } else {
                                                field.onChange(undefined)
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='recipientName'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder='Ім’я отримувача'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='recipientPhone'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PhoneInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='anonymous'
                        render={({ field }) => (
                            <FormItem>
                                <label className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        checked={field.value}
                                        onChange={field.onChange}
                                    />
                                    Анонімна доставка
                                </label>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='shop'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder='Магазин'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='house'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder='Будинок'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='apartment'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder='Квартира'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='street'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder='Вулиця'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type='button'
                    className='w-2/3'
                    variant='accent'
                    onClick={onNext}
                >
                    Продовжити
                </Button>
            </div>
        )
    }

    // Step 3: Оплата (radio group)
    return (
        <div className='mt-8 flex flex-col gap-6 rounded-3xl border p-6'>
            <h2 className='self-start text-xl font-medium'>{STEP_TITLES[step]}</h2>
            <div className='mt-6 grid grid-cols-2 gap-4'>
                <FormField
                    control={form.control}
                    name='paymentMethod'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='flex flex-col gap-2'>
                                    {paymentOptions.map((option) => (
                                        <label
                                            key={option.id}
                                            className='flex cursor-pointer items-center gap-2'
                                        >
                                            <input
                                                type='radio'
                                                value={option.id}
                                                checked={field.value === option.id}
                                                onChange={() => field.onChange(option.id)}
                                            />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name='call'
                render={({ field }) => (
                    <FormItem>
                        <Label className='flex items-center gap-2'>
                            <Checkbox
                                className='size-7'
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            Мені не потрібно телефонувати для підтвердження замовлення
                        </Label>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button
                type='button'
                className='w-2/3'
                variant='accent'
                onClick={onNext}
            >
                Підтверджую
            </Button>
            <div className='max-w-[460px] text-sm'>
                Натискаючи Підтвердити замовлення, ви приймаєте угоду і даєте згоду на
                обробку персональних даних
            </div>
        </div>
    )
}

const StepSummary: React.FC<{
    step: StepIndex
    values: CheckoutFormValues
    onEdit: () => void
}> = ({ step, values, onEdit }) => {
    return (
        <div className='relative mt-8 flex flex-col items-center gap-6 rounded-3xl border p-6'>
            <h2 className='text-xl font-medium'>{STEP_TITLES[step]}</h2>
            <div className='mt-6 grid w-full grid-cols-2 gap-4'>
                {step === 0 && (
                    <>
                        <SummaryItem
                            label='Ім’я'
                            value={values.username}
                        />
                        <SummaryItem
                            label='Телефон'
                            value={values.phone}
                        />
                        <SummaryItem
                            label='E-mail'
                            value={values.email}
                        />
                        <SummaryItem
                            label='Місто'
                            value={values.city}
                        />
                    </>
                )}
                {step === 1 && (
                    <>
                        <SummaryItem
                            label='Дата'
                            value={
                                values.date ? values.date.toLocaleDateString('uk-UA') : ''
                            }
                        />
                        <SummaryItem
                            label='Час'
                            value={
                                values.time
                                    ? values.time.toLocaleTimeString('uk-UA', {
                                          hour: '2-digit',
                                          minute: '2-digit'
                                      })
                                    : ''
                            }
                        />
                        <SummaryItem
                            label='Ім’я отримувача'
                            value={values.recipientName}
                        />
                        <SummaryItem
                            label='Телефон отримувача'
                            value={values.recipientPhone}
                        />
                        <SummaryItem
                            label='Анонімна доставка'
                            value={values.anonymous ? 'Так' : 'Ні'}
                        />
                        <SummaryItem
                            label='Магазин'
                            value={values.shop}
                        />
                        <SummaryItem
                            label='Будинок'
                            value={values.house}
                        />
                        <SummaryItem
                            label='Квартира'
                            value={values.apartment}
                        />
                        <SummaryItem
                            label='Вулиця'
                            value={values.street}
                        />
                    </>
                )}
                {step === 2 && (
                    <>
                        <SummaryItem
                            label='Спосіб оплати'
                            value={
                                paymentOptions.find(
                                    (opt) => opt.id === values.paymentMethod
                                )?.label || ''
                            }
                        />
                        <SummaryItem
                            label='Передзвонити для підтвердження'
                            value={values.call ? 'Так' : 'Ні'}
                        />
                    </>
                )}
            </div>
            <button
                type='button'
                className='absolute bottom-6 right-6 text-sm underline'
                onClick={onEdit}
            >
                Редагувати
            </button>
        </div>
    )
}

const SummaryItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <div className='text-sm text-gray-500'>{label}</div>
        <div className='font-semibold'>{value}</div>
    </div>
)

const StepEmpty: React.FC<{ step: StepIndex }> = ({ step }) => (
    <div className='mt-8 flex h-[75px] items-center rounded-3xl border p-6'>
        <h2 className='text-xl font-medium'>{STEP_TITLES[step]}</h2>
    </div>
)
