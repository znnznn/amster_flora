'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateContact } from '@/api/contacts'
import type { ContactPayload } from '@/api/contacts/contacts-types'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'

const contactsSchema = z.object({
    name: z.string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    phone_number: z.string().min(1, {
        message: 'Це поле є обов’язковим'
    }),
    email: z.string().email().min(1, 'Це поле є обов’язковим')
})

export const ContactsForm = () => {
    const form = useForm<ContactPayload>({
        resolver: zodResolver(contactsSchema),
        defaultValues: {
            name: '',
            phone_number: '',
            email: ''
        }
    })

    const createContactMutation = useCreateContact({
        onSuccess: () => {
            form.reset()
            toast.success('Ваш запит успішно надіслано!')
        }
    })

    const onSubmit = (data: ContactPayload) => {
        createContactMutation.mutate({
            ...data,
            text: 'test'
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='mt-8 space-y-4'
            >
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
                    name='phone_number'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PhoneInput
                                    placeholder='+380 068 777 88 93'
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={createContactMutation.isLoading}
                    className='w-full'
                    type='submit'
                >
                    {createContactMutation.isLoading ? (
                        <Loader2 className='animate-spin' />
                    ) : (
                        <span>Відправити</span>
                    )}
                </Button>
            </form>
        </Form>
    )
}
