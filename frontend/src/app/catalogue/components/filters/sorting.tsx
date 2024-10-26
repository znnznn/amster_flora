'use client'

import { useQueryState } from 'nuqs'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const SortingFilter = () => {
    const [sorting, setSorting] = useQueryState('sorting', { defaultValue: 'price' })

    return (
        <Select
            defaultValue={sorting}
            onValueChange={setSorting}>
            <SelectTrigger className='w-48 border-none font-medium'>
                <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='price'>Спочатку дешевше</SelectItem>
                <SelectItem value='-price'>Спочатку дорожче</SelectItem>
                <SelectItem value='popular'>За популярністю</SelectItem>
                <SelectItem value='new'>Новинки</SelectItem>
                <SelectItem value='promo'>Акції</SelectItem>
            </SelectContent>
        </Select>
    )
}
