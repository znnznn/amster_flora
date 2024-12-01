'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useState } from 'react'
import { type UseFormReturn, useForm } from 'react-hook-form'
import { withMask } from 'use-mask-input'
import {
    boolean,
    date,
    enum as enum_zod,
    object,
    string,
    type infer as zodInfer
} from 'zod'

import { ShopSelect } from './conrols/shop-select'
import { StreetSelect } from './conrols/street-select'
import { TimePicker } from './conrols/time-picker'
import { CityInput } from '@/components/city-input'
import { SocialsButtons } from '@/components/socials-buttons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

const citySchema = object({
    name: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    ref: string().min(1, {
        message: 'Це поле є обов’язковим'
    })
})

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
    date: date({
        required_error: 'Це поле є обов’язковим'
    }),
    time: date({
        required_error: 'Це поле є обов’язковим'
    }),
    recipientName: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    recipientPhone: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    anonymous: boolean().default(false),
    city: citySchema,
    shop: citySchema,
    house: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    apartment: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    paymentMethod: enum_zod(['cash', 'way-for-pay'], {
        required_error: 'Ви маєте обрати спосіб оплати'
    }).default('cash'),
    wayforpay: boolean().default(true),
    call: boolean().default(true),
    street: citySchema
})

type CheckoutFormValues = zodInfer<typeof checkoutSchema>

export const StepperForm = () => {
    const { user } = useAuth()

    const [step, setStep] = useState(2)

    const [recipient, setRecipient] = useState<'recipient' | 'gift'>('recipient')
    const [deliveryType, setDeliveryType] = useState<'self' | 'courier'>('self')

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            username: user?.first_name || '',
            phone: user?.phone_number || '',
            city: {
                name: '',
                ref: ''
            },
            paymentMethod: 'cash',
            email: user?.email || ''
        }
    })

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
                            'text-2xl font-medium text-primary transition-opacity'
                        )}>
                        Ваші дані
                    </h2>
                    {step === 1 ? (
                        <InfoBlock
                            form={form}
                            setStep={setStep}
                        />
                    ) : (
                        <ReadOnlyPersonalDataBlock
                            setStep={setStep}
                            form={form}
                        />
                    )}
                </div>
                <div className='w-full rounded-3xl border p-6'>
                    <h2
                        className={cn(
                            'text-2xl font-medium text-primary transition-opacity'
                        )}>
                        Доставка
                    </h2>
                    {step === 2 ? (
                        <DeliveryBlock
                            deliveryType={deliveryType}
                            setDeliveryType={setDeliveryType}
                            form={form}
                            setStep={setStep}
                            recipient={recipient}
                            setRecipient={setRecipient}
                        />
                    ) : (
                        <ReadOnlyDeliveryBlock
                            deliveryType={deliveryType}
                            form={form}
                            setStep={setStep}
                            recipient={recipient}
                        />
                    )}
                </div>

                <div className='w-full rounded-3xl border p-6'>
                    <h2
                        className={cn(
                            'text-2xl font-medium text-primary transition-opacity'
                        )}>
                        Оплата
                    </h2>

                    {step === 3 ? (
                        <PaymentBlock form={form} />
                    ) : (
                        <ReadOnlyPaymentBlock
                            form={form}
                            setStep={setStep}
                        />
                    )}
                </div>
            </form>
        </Form>
    )
}

const InfoBlock = ({
    form,
    setStep
}: {
    form: UseFormReturn<CheckoutFormValues>
    setStep: React.Dispatch<React.SetStateAction<number>>
}) => {
    const { phone, username, email, city } = form.getValues()

    const nextStepDisabled = !phone || !username || !email || !city.ref

    return (
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
                            <FormControl ref={withMask('+380 99 999 99 99')}>
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
                    name='city'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <CityInput
                                    city={city}
                                    setCity={field.onChange}
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
                    disabled={nextStepDisabled}
                    className='mx-auto mt-8 w-96'
                    type='button'>
                    Продовжити
                </Button>

                <SocialsButtons />
            </div>
        </div>
    )
}

const DeliveryBlock = ({
    form,
    setStep,
    recipient,
    setRecipient,
    deliveryType,
    setDeliveryType
}: {
    form: UseFormReturn<CheckoutFormValues>
    setStep: React.Dispatch<React.SetStateAction<number>>
    setRecipient: React.Dispatch<React.SetStateAction<'recipient' | 'gift'>>
    recipient: 'recipient' | 'gift'
    deliveryType: 'self' | 'courier'
    setDeliveryType: React.Dispatch<React.SetStateAction<'self' | 'courier'>>
}) => {
    const { street, apartment, house, time, date, shop, recipientName, recipientPhone } =
        form.watch()

    const isGiftRecipientIncomplete =
        recipient === 'gift' && (!recipientName || !recipientPhone)

    const isSelfPickupIncomplete =
        deliveryType === 'self' && (!time || !date || !shop?.ref)

    const isCourierDeliveryIncomplete =
        deliveryType === 'courier' &&
        (!street?.ref || !apartment || !house || !date || !time)

    const nextStepDisabled =
        isGiftRecipientIncomplete ||
        (deliveryType === 'self' ? isSelfPickupIncomplete : isCourierDeliveryIncomplete)

    return (
        <div className='mt-8'>
            <div className='flex items-start gap-x-8'>
                <div className='flex items-start space-x-2'>
                    <Switch
                        onCheckedChange={() =>
                            setDeliveryType(deliveryType === 'self' ? 'courier' : 'self')
                        }
                        checked={deliveryType === 'self'}
                        id='self'
                    />
                    <div className='flex flex-col gap-y-1'>
                        <Label htmlFor='self'>Самовивіз</Label>
                        <span className='text-xs text-muted-foreground'>Безкоштовно</span>
                    </div>
                </div>
                <div className='flex items-start space-x-2'>
                    <Switch
                        onCheckedChange={() =>
                            setDeliveryType(
                                deliveryType === 'courier' ? 'self' : 'courier'
                            )
                        }
                        checked={deliveryType === 'courier'}
                        id='courier'
                    />
                    <Label htmlFor='courier'>Кур'єр</Label>
                </div>
            </div>

            {deliveryType === 'self' ? (
                <SelfBlock form={form} />
            ) : (
                <CourierBlock
                    form={form}
                    setRecipient={setRecipient}
                    recipient={recipient}
                />
            )}

            <Button
                size='lg'
                variant='secondary'
                className='mt-4 flex-1'
                onClick={() => setStep(3)}
                disabled={nextStepDisabled}
                type='button'>
                Продовжити
            </Button>
        </div>
    )
}
const SelfBlock = ({ form }: { form: UseFormReturn<CheckoutFormValues> }) => {
    return (
        <>
            <FormField
                control={form.control}
                name='shop'
                render={({ field }) => (
                    <FormItem className='mt-8'>
                        <FormControl>
                            <ShopSelect
                                shop={field.value}
                                setShop={field.onChange}
                            />
                        </FormControl>
                        <FormDescription className='pl-4'>
                            Пн-Нд: 08:00 - 21:00
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                    <FormItem className='mt-8'>
                        <FormControl>
                            <DatePicker
                                className='h-12 w-full justify-start border border-input hover:bg-transparent'
                                date={field.value}
                                setDate={field.onChange}
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
                    <FormItem className='mt-8'>
                        <FormControl>
                            <TimePicker
                                date={field.value}
                                setDate={field.onChange}
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

const CourierBlock = ({
    form,
    setRecipient,
    recipient
}: {
    form: UseFormReturn<CheckoutFormValues>
    setRecipient: React.Dispatch<React.SetStateAction<'recipient' | 'gift'>>
    recipient: 'recipient' | 'gift'
}) => {
    return (
        <>
            <div className='flex items-center gap-x-4'>
                <FormField
                    control={form.control}
                    name='street'
                    render={({ field }) => (
                        <FormItem className='mt-8'>
                            <FormControl>
                                <StreetSelect
                                    street={field.value}
                                    setStreet={field.onChange}
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
                        <FormItem className='mt-8'>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='number'
                                    inputMode='numeric'
                                    placeholder='Будинок'
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
                        <FormItem className='mt-8'>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='number'
                                    inputMode='numeric'
                                    placeholder='Квартира'
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                    <FormItem className='mt-8'>
                        <FormControl>
                            <DatePicker
                                className='h-12 w-full justify-start border border-input hover:bg-transparent'
                                date={field.value}
                                setDate={field.onChange}
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
                    <FormItem className='mt-8'>
                        <FormControl>
                            <TimePicker
                                date={field.value}
                                setDate={field.onChange}
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <Tabs
                onValueChange={(value) => setRecipient(value as 'recipient' | 'gift')}
                className='mt-4'
                defaultValue={recipient}>
                <TabsList className='gap-x-10 bg-transparent'>
                    <TabsTrigger
                        asChild
                        className='bg-transparent hover:bg-input data-[state=active]:bg-input'
                        value='recipient'>
                        <Button variant='secondary'>Я отримувач</Button>
                    </TabsTrigger>
                    <TabsTrigger
                        asChild
                        className='bg-transparent hover:bg-input data-[state=active]:bg-input'
                        value='gift'>
                        <Button variant='secondary'>У подарунок</Button>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='gift'>
                    <FormField
                        control={form.control}
                        name='recipientName'
                        render={({ field }) => (
                            <FormItem className='mt-4'>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Ім'я отримувача"
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
                            <FormItem className='mt-4'>
                                <FormControl
                                    ref={withMask('+380 99 999 99 99', {
                                        inputmode: 'tel'
                                    })}>
                                    <Input
                                        type='tel'
                                        inputMode='tel'
                                        {...field}
                                        placeholder='Телефон отримувача'
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='anonymous'
                        render={({ field }) => (
                            <FormItem className='mt-4 flex flex-row items-start space-x-3 space-y-0'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        className='size-5'
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Доставити анонімно</FormLabel>
                            </FormItem>
                        )}
                    />
                </TabsContent>
            </Tabs>
        </>
    )
}

const PaymentBlock = ({ form }: { form: UseFormReturn<CheckoutFormValues> }) => {
    return (
        <>
            <FormField
                control={form.control}
                name='paymentMethod'
                render={({ field }) => (
                    <FormItem className='mt-6'>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className='flex flex-col space-y-3'>
                                <FormItem className='flex items-start space-x-3 space-y-0'>
                                    <FormControl>
                                        <RadioGroupItem value='cash' />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel className='text-lg leading-none'>
                                            Готівка
                                        </FormLabel>
                                        <FormDescription>
                                            Оплата при отриманні замовлення
                                        </FormDescription>
                                    </div>
                                </FormItem>
                                <FormItem className='flex items-start space-x-3 space-y-0'>
                                    <FormControl>
                                        <RadioGroupItem value='way-for-pay' />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel className='text-lg leading-none'>
                                            WayForPay
                                        </FormLabel>
                                        <FormDescription>
                                            Після оформлення замовлення ви будете
                                            перенаправленні на сторінку оплати
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button
                size='lg'
                variant='secondary'
                className='mt-8 w-96'
                type='submit'>
                Підтвердити замовлення
            </Button>

            <FormField
                control={form.control}
                name='call'
                render={({ field }) => (
                    <FormItem className='mt-6 flex flex-row items-start space-x-3 space-y-0'>
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                className='size-5'
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <FormDescription className='max-w-96'>
                            Мені не потрібно телефонувати для підтвердження замовлення
                        </FormDescription>
                    </FormItem>
                )}
            />
            <p className='mt-4 text-sm text-muted-foreground'>
                Натискаючи Підтвердити замовлення, ви приймаєте угоду і даєте згоду на
                обробку персональних даних
            </p>
        </>
    )
}

const ReadOnlyPersonalDataBlock = ({
    form,
    setStep
}: {
    form: UseFormReturn<CheckoutFormValues>
    setStep: React.Dispatch<React.SetStateAction<number>>
}) => {
    const { username, phone, email, city } = form.getValues()

    const isEditDisabled = !username || !phone || !email || !city?.ref
    return (
        <div className='mt-6'>
            <div className='flex flex-col items-start gap-y-4'>
                {username && <span>Ім'я: {username}</span>}
                {phone && <span>Телефон: {phone}</span>}
                {email && <span>Email: {email}</span>}
                {city?.name && <span>Місто: {city?.name}</span>}
            </div>
            {isEditDisabled ? null : (
                <div className='flex w-full justify-end'>
                    <Button
                        onClick={() => setStep(1)}
                        className='text-muted-foreground underline hover:text-primary'
                        variant='link'>
                        Редагувати
                    </Button>
                </div>
            )}
        </div>
    )
}

const ReadOnlyDeliveryBlock = ({
    form,
    setStep,
    recipient,
    deliveryType
}: {
    form: UseFormReturn<CheckoutFormValues>
    setStep: React.Dispatch<React.SetStateAction<number>>
    recipient: 'recipient' | 'gift'
    deliveryType: 'self' | 'courier'
}) => {
    const {
        street,
        apartment,
        house,
        time,
        date,
        shop,
        recipientName,
        recipientPhone,
        anonymous
    } = form.watch()

    const isSelfPickupInfoComplete = shop?.name && date && time
    const isCourierInfoComplete = street?.ref && apartment && house && date && time
    const isGiftInfoComplete =
        recipient === 'gift' ? recipientName && recipientPhone : true

    const showEditButton =
        deliveryType === 'self'
            ? !isSelfPickupInfoComplete
            : !isCourierInfoComplete || !isGiftInfoComplete

    return (
        <div className='mt-6'>
            <h3 className='font-medium text-primary'>
                {deliveryType === 'self' ? 'Самовивіз' : "Кур'єр"}
            </h3>
            <div className='mt-4 flex flex-col items-start gap-y-4'>
                {deliveryType === 'self' ? (
                    <>
                        {shop?.name && <span>Магазин: {shop?.name}</span>}
                        {date && <span>Дата: {format(date, 'dd.MM.yyyy')}</span>}
                        {time && <span>Час: {format(time, 'HH:mm')}</span>}
                    </>
                ) : (
                    <>
                        {street?.ref && <span>Вулиця: {street?.name}</span>}
                        {house && <span>Будинок: {house}</span>}
                        {apartment && <span>Квартира: {apartment}</span>}
                        {date && <span>Дата: {format(date, 'dd.MM.yyyy')}</span>}
                        {time && <span>Час: {format(time, 'HH:mm')}</span>}
                    </>
                )}

                {recipient === 'gift' && (
                    <>
                        <h3 className='font-medium text-primary'>У подарунок</h3>
                        {recipientName && <span>Ім'я отримувача: {recipientName}</span>}
                        {recipientPhone && (
                            <span>Номер телефону отримувача: {recipientPhone}</span>
                        )}
                        {anonymous && <span>Анонімна доставка</span>}
                    </>
                )}
            </div>
            {showEditButton ? null : (
                <div className='flex w-full justify-end'>
                    <Button
                        onClick={() => setStep(2)}
                        className='text-muted-foreground underline hover:text-primary'
                        variant='link'>
                        Редагувати
                    </Button>
                </div>
            )}
        </div>
    )
}

const ReadOnlyPaymentBlock = ({
    form,
    setStep
}: {
    form: UseFormReturn<CheckoutFormValues>
    setStep: React.Dispatch<React.SetStateAction<number>>
}) => {
    const isWayForPay = form.getValues('paymentMethod') === 'way-for-pay'
    const isCash = form.getValues('paymentMethod') === 'cash'
    const isCall = form.getValues('call')

    const paymentMethod = isWayForPay ? 'WayForPay' : isCash ? 'Готівка' : ''
    return (
        <div className='mt-6'>
            <div className='flex flex-col items-start gap-y-4'>
                <span> {paymentMethod}</span>
                <span>
                    {isCall === undefined
                        ? ''
                        : isCall
                          ? 'Не телефонувати для підтвердження замовлення'
                          : 'Зателефонувати для підтвердження замовлення'}
                </span>
            </div>
            {isWayForPay || isCash ? (
                <div className='flex w-full justify-end'>
                    <Button
                        onClick={() => setStep(3)}
                        className='text-muted-foreground underline hover:text-primary'
                        variant='link'>
                        Редагувати
                    </Button>
                </div>
            ) : null}
        </div>
    )
}
