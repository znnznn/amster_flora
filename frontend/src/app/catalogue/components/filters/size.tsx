import { useQueryState } from 'nuqs'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const SizeFilter = () => {
    const [size, setSize] = useQueryState('size', { defaultValue: '' })

    return (
        <div>
            <h3 className='text-[22px] font-medium text-accent'>Розмір</h3>
            <ToggleGroup
                defaultValue={size}
                onValueChange={setSize}
                className='mt-4 justify-start gap-x-2'
                type='single'>
                <ToggleGroupItem
                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                    value='s'>
                    S
                </ToggleGroupItem>
                <ToggleGroupItem
                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                    value='m'>
                    M
                </ToggleGroupItem>
                <ToggleGroupItem
                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                    value='l'>
                    L
                </ToggleGroupItem>
                <ToggleGroupItem
                    className='size-11 bg-accent/40 text-lg font-medium text-accent'
                    value='xl'>
                    XL
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}
