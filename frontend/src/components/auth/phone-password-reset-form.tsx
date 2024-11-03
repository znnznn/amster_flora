import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { withMask } from 'use-mask-input'
import { object, string, type infer as zodInfer } from 'zod'

import { Button } from '../ui/button'
import { SheetHeader, SheetTitle } from '../ui/sheet'

import type { CurrentModal } from './modal'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const PhonePasswordResetSchema = object({
    phone: string().min(1, {
        message: 'Це поле є обов’язковим'
    })
})

type PhonePasswordResetFormData = zodInfer<typeof PhonePasswordResetSchema>

interface PhonePasswordResetFormProps {
    setCurrentModal: React.Dispatch<React.SetStateAction<CurrentModal>>
}

export const PhonePasswordResetForm = ({
    setCurrentModal
}: PhonePasswordResetFormProps) => {
    const form = useForm<PhonePasswordResetFormData>({
        resolver: zodResolver(PhonePasswordResetSchema),
        defaultValues: {
            phone: ''
        }
    })

    const onSubmit = (data: PhonePasswordResetFormData) => {
        console.log(data)
    }

    return (
        <>
            <SheetHeader>
                <SheetTitle className='text-center text-[28px] text-accent'>
                    Відновити пароль
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

                    <Button
                        className='w-full'
                        size='lg'
                        variant='secondary'
                        type='submit'>
                        Надіслати
                    </Button>
                    <Button
                        onClick={() => setCurrentModal('password-reset')}
                        type='button'
                        variant='link'
                        className='text-lg text-accent'>
                        Відновити через E-mail
                    </Button>
                    <Button
                        onClick={() => setCurrentModal('login')}
                        type='button'
                        variant='link'
                        className='text-lg text-accent'>
                        Я згадав пароль
                    </Button>
                </form>
            </Form>
        </>
    )
}
