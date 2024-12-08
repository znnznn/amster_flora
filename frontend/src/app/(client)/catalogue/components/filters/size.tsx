import { useQueryState } from 'nuqs'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const SizeFilter = () => {
    const [size, setSize] = useQueryState('size', { defaultValue: '', shallow: false })

    return (
        <div>
            <h3 className='text-2xl font-medium text-accent'>Розмір</h3>
            <ToggleGroup
                key={size}
                defaultValue={size}
                onValueChange={setSize}
                className='mt-4 justify-start gap-x-2'
                type='single'>
                <ToggleGroupItem
                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                    value='small'>
                    S
                </ToggleGroupItem>
                <ToggleGroupItem
                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                    value='medium'>
                    M
                </ToggleGroupItem>
                <ToggleGroupItem
                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                    value='large'>
                    L
                </ToggleGroupItem>
                <ToggleGroupItem
                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                    value='extra_large'>
                    XL
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}
