'use client'

import { useQuery } from 'react-query'

import { getShops } from '@/api/shops/shops'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface ShopSelectProps {
    value: number
    onChange: (value: number) => void
}

export const ShopSelect = ({ value, onChange }: ShopSelectProps) => {
    const { data: shops } = useQuery('shops', async () => {
        const response = await getShops()
        return response.results
    })

    return (
        <Select
            onValueChange={(value) => onChange(+value)}
            value={value.toString()}>
            <div className='space-y-1'>
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть мазазин' />
                </SelectTrigger>
            </div>
            <SelectContent>
                {shops?.map((shop) => (
                    <SelectItem
                        key={shop.id}
                        value={shop.id.toString()}>
                        {shop.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
