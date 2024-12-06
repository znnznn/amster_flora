'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle, CirclePlus, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { z } from 'zod'

import { SizeSelect } from './size-select'
import { getCategories } from '@/api/categories/categories'
import { addVariant } from '@/api/variants/variants'
import type { AddVariantPayload } from '@/api/variants/variants.types'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { FilePicker } from '@/components/ui/file-picker'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const addVariantSchema = z.custom<AddVariantPayload>()

type AddVariantFormData = z.infer<typeof addVariantSchema>

export const AddVariant = () => {
    const form = useForm<AddVariantFormData>({
        resolver: zodResolver(addVariantSchema),
        defaultValues: {
            diameter: '1',
            height: '1',
            size: '',
            price: '1',
            quantity: '1',
            hex_color: '#ffffff',
            images: [],
            components: [
                {
                    key_crm_product: 1,
                    quantity: 1
                }
            ]
        }
    })

    // const {
    //     fields: variantFields,
    //     append: appendVariant,
    //     remove: removeVariant
    // } = useFieldArray({
    //     control: form.control,
    //     name: 'variants'
    // })

    const mutation = useMutation({
        mutationFn: (payload: AddVariantFormData) => addVariant(payload),
        onSuccess: () => {
            form.reset()
        }
    })

    const onSubmit = (data: AddVariantFormData) => {
        const formData = new FormData()
        formData.append('size', data.size)
        formData.append('height', data.height.toString())
        formData.append('diameter', data.diameter.toString())
        formData.append('hex_color', data.hex_color)
        formData.append('quantity', data.quantity.toString())
        formData.append('price', data.price)

        // Додаємо файли до FormData
        data.images.forEach((file) => formData.append('images', file))

        // Додаємо компоненти у вигляді JSON
        formData.append('components', JSON.stringify(data.components))

        mutation.mutate(formData)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>
                    <CirclePlus />
                    Додати варіант
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-3xl [&_label]:text-background'>
                <DialogHeader>
                    <DialogTitle>Додати варіант</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='mt-8 space-y-4'>
                        <FormField
                            control={form.control}
                            name='images'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Зображення</FormLabel>
                                    <FormControl>
                                        <FilePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='grid grid-cols-3 grid-rows-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='height'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Висота</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Висота'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='diameter'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Діаметр</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Діаметр'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='size'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Розмір</FormLabel>
                                        <FormControl>
                                            <SizeSelect
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='hex_color'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Колір</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='color'
                                                placeholder='Колір'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='quantity'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Кількість</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                placeholder='Кількість'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ціна</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                placeholder='Ціна'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            disabled={mutation.isLoading}
                            className='w-full'
                            variant='secondary'
                            size='lg'
                            type='submit'>
                            {mutation.isLoading ? (
                                <Loader2 className='animate-spin' />
                            ) : null}
                            Додати
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
                            <AlertDescription>Букет додано успішно</AlertDescription>
                        </Alert>
                    ) : null}
                </Form>
            </DialogContent>
        </Dialog>
    )
}

const CategorySelect = ({
    value,
    onChange
}: {
    value: number
    onChange: (value: number) => void
}) => {
    const { data: categories } = useQuery('categories', async () => {
        const response = await getCategories()
        return response.results
    })

    return (
        <Select
            onValueChange={(value) => onChange(+value)}
            value={value?.toString()}>
            <SelectTrigger>
                <SelectValue placeholder='Оберіть категорію' />
            </SelectTrigger>
            <SelectContent>
                {categories?.map((category) => (
                    <SelectItem
                        key={category.id}
                        value={category.id.toString()}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

const FileSvgDraw = () => {
    return (
        <>
            <svg
                className='mb-3 h-8 w-8 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 16'>
                <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                />
            </svg>
            <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Натисність щоб завантажити</span>
                &nbsp; або перетягніть зображення
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
                SVG, PNG, JPG або GIF
            </p>
        </>
    )
}
