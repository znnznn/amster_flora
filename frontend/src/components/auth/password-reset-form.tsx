import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { object, string, type infer as zodInfer } from 'zod'

import { Button } from '../ui/button'
import { SheetHeader, SheetTitle } from '../ui/sheet'

import type { CurrentModal } from './modal'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const passwordResetSchema = object({
    email: string()
        .min(1, {
            message: 'Це поле є обов’язковим'
        })
        .email({
            message: 'Це поле має відповідати формату email'
        })
})

type PasswordResetFormData = zodInfer<typeof passwordResetSchema>

interface PasswordResetFormProps {
    setCurrentModal: React.Dispatch<React.SetStateAction<CurrentModal>>
}

export const PasswordResetForm = ({ setCurrentModal }: PasswordResetFormProps) => {
    const form = useForm<PasswordResetFormData>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = (data: PasswordResetFormData) => {
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
                        Надіслати
                    </Button>
                    <Button
                        onClick={() => setCurrentModal('phone-password-reset')}
                        type='button'
                        variant='link'
                        className='text-lg text-accent'>
                        Відновити через телефон
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
