'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { withMask } from 'use-mask-input'
import { string, z } from 'zod'

import { addContactUs } from '@/api/contact-us/contact-us'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const contactsSchema = z.object({
    name: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    phone_number: string().min(1, {
        message: 'Це поле є обов’язковим'
    })
})

type ContactsFormData = z.infer<typeof contactsSchema>

export const ContactsForm = () => {
    const form = useForm<z.infer<typeof contactsSchema>>({
        resolver: zodResolver(contactsSchema),
        defaultValues: {
            name: '',
            phone_number: ''
        }
    })
    const mutation = useMutation({
        mutationFn: (payload: ContactsFormData) =>
            addContactUs({
                phone_number: payload.phone_number?.replaceAll(' ', ''),
                name: payload.name,
                text: 'some',
                email: 'name@gmail.com'
            }),
        onSuccess: () => {
            form.reset()
        }
    })

    const onSubmit = (data: ContactsFormData) => {
        mutation.mutate(data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='mt-8 space-y-4'>
                <FormField
                    control={form.control}
                    name='name'
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
                    name='phone_number'
                    render={({ field }) => (
                        <FormItem>
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
                    disabled={mutation.isLoading}
                    className='w-full'
                    size='lg'
                    type='submit'>
                    {mutation.isLoading ? <Loader2 className='animate-spin' /> : null}
                    Відправити
                </Button>
            </form>
            {mutation.isError ? (
                <Alert
                    closable
                    variant='destructive'
                    className='mt-4'>
                    <AlertCircle className='size-4' />
                    <AlertDescription>Щось пішло не так</AlertDescription>
                </Alert>
            ) : null}
            {mutation.isSuccess ? (
                <Alert
                    closable
                    className='mt-4'
                    variant='success'>
                    <CheckCircle className='size-4' />
                    <AlertDescription>Повідомлення відправлено успішно</AlertDescription>
                </Alert>
            ) : null}
        </Form>
    )
}
