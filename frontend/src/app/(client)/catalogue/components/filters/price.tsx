'use client'

import { useQueryState } from 'nuqs'

import { DualSlider } from '@/components/ui/dual-slider'

export const PriceFilter = () => {
    const [price, setPrice] = useQueryState('price', { defaultValue: '10,60' })

    const handleValueChange = (newValues: number[]) => {
        setPrice(`${newValues[0]},${newValues[1]}`)
    }

    return (
        <div>
            <h3 className='text-2xl font-medium text-accent'>Вартість</h3>
            <DualSlider
                className='mt-4 w-full'
                step={5}
                max={100}
                min={5}
                onValueChange={handleValueChange}
                formatLabel={() => ''}
                minStepsBetweenThumbs={1}
                value={price?.split(',').map((value) => +value) || [5, 100]}
            />
        </div>
    )
}
