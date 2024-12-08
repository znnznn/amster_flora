'use client'

import { useQueryState } from 'nuqs'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const OrderingFilter = () => {
    const [ordering, setOrdering] = useQueryState('ordering', {
        defaultValue: '-price',
        shallow: false
    })

    return (
        <Select
            defaultValue={ordering}
            onValueChange={setOrdering}>
            <SelectTrigger className='w-48 font-medium max-sm:w-full'>
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
