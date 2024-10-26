'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { string, z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const contactsSchema = z.object({
    username: string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    phone: string().min(1, {
        message: 'Це поле є обов’язковим'
    })
})

type ContactsFormData = z.infer<typeof contactsSchema>

export const ContactsForm = () => {
    const form = useForm<z.infer<typeof contactsSchema>>({
        resolver: zodResolver(contactsSchema),
        defaultValues: {
            username: '',
            phone: ''
        }
    })

    const onSubmit = (data: ContactsFormData) => {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='mt-8 space-y-4'>
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
                                <Input
                                    type='tel'
                                    inputMode='tel'
                                    placeholder='096 222 4444'
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
                    type='submit'>
                    Відправити
                </Button>
            </form>
        </Form>
    )
}
