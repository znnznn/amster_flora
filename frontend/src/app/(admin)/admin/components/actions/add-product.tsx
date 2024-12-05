'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle, CirclePlus, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { z } from 'zod'

import { ShopSelect } from './shop-select'
import { getCategories } from '@/api/categories/categories'
import { addProduct } from '@/api/products/products'
import type { AddProductPayload } from '@/api/products/products.types'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
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
import { Textarea } from '@/components/ui/textarea'

const addProductSchema = z.custom<AddProductPayload>()

type AddProductFormData = z.infer<typeof addProductSchema>

export const AddProduct = () => {
    const form = useForm<AddProductFormData>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            name: 'Test',
            category: 1,
            description: '',
            shop: 1,
            sku: 'sku',
            variants: [
                {
                    diameter: 10,
                    height: 20,
                    size: 'large',
                    price: '100',
                    quantity: 10,
                    hex_color: '#ffffff',
                    images: [],
                    components: [
                        {
                            key_crm_product: 1,
                            quantity: 1
                        }
                    ]
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
        mutationFn: (payload: AddProductFormData) => addProduct(payload),
        onSuccess: () => {
            form.reset()
        }
    })

    const onSubmit = (data: AddProductFormData) => {
        const formData = new FormData()

        // Додаємо основні поля продукту
        formData.append('name', data.name)
        formData.append('sku', data.sku)
        formData.append('description', data.description)
        formData.append('category', data.category.toString())
        formData.append('shop', data.shop.toString())

        // Створюємо масив варіантів
        const variants = data.variants.map((variant) => {
            const variantData = {
                size: variant.size,
                height: variant.height,
                diameter: variant.diameter,
                hex_color: variant.hex_color,
                quantity: variant.quantity,
                price: variant.price,
                components: variant.components,
                images: []
            }

            // Якщо є зображення, додаємо їх до FormData
            if (variant.images && variant.images.length > 0) {
                formData.append(`images`, variant.images[0])
            }

            return variantData
        })

        // Додаємо масив варіантів як JSON-рядок
        formData.append('variants', JSON.stringify(variants))

        // Відправляємо дані на сервер
        mutation.mutate(formData as any)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>
                    <CirclePlus />
                    Додати букет
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-3xl [&_label]:text-background'>
                <DialogHeader>
                    <DialogTitle>Додати букет</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='mt-8 space-y-4'>
                        <div className='grid grid-cols-2 grid-rows-3 gap-x-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Назва букету</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Назва букету'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Назва букету</FormLabel>
                                        <FormControl></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='sku'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SKU</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='SKU'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='shop'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Магазин</FormLabel>
                                        <FormControl>
                                            <ShopSelect
                                                onChange={field.onChange}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Категорія</FormLabel>
                                        <FormControl>
                                            <CategorySelect
                                                onChange={field.onChange}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem className='col-span-2'>
                                        <FormLabel>Опис</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder='Опис букету'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* <div>
                            <h3 className='mb-2 text-lg font-semibold'>Варіанти</h3>
                            {variantFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className='mb-4 rounded-md border p-4'>
                                    <h4 className='text-md mb-2 font-semibold'>
                                        Варіант {index + 1}
                                    </h4>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <FormField
                                            control={form.control}
                                            name={`variants.${index}.diameter`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Діаметр</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='number'
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    +e.target.value
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
                                            name={`variants.${index}.height`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Висота</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='number'
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    +e.target.value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Controller
                                            name={`variants.${index}.images`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Зображення</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='file'
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    e.target.files?.[0]
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
                                            name={`variants.${index}.size`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Розмір</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`variants.${index}.price`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Ціна</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type='number'
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`variants.${index}.quantity`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Кількість</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='number'
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    +e.target.value
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
                                            name={`variants.${index}.hex_color`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Колір (HEX)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='color'
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
                                        variant='destructive'
                                        size='sm'
                                        className='mt-2'
                                        onClick={() => removeVariant(index)}>
                                        <Trash2 className='mr-2 h-4 w-4' />
                                        Видалити варіант
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type='button'
                                variant='outline'
                                size='sm'
                                onClick={() =>
                                    appendVariant({
                                        diameter: 0,
                                        height: 0,
                                        size: '',
                                        price: '',
                                        quantity: 0,
                                        hex_color: '#ffffff',
                                        images: [],
                                        components: []
                                    })
                                }>
                                <Plus className='mr-2 h-4 w-4' />
                                Додати варіант
                            </Button>
                        </div> */}

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
