import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const PRODUCT_SIZES = {
    small: 'S',
    medium: 'M',
    large: 'L',
    extra_large: 'XL'
}

export type ProductSize = keyof typeof PRODUCT_SIZES

interface ProductSizeToggleProps {
    value: ProductSize
    onChange: (value: ProductSize) => void
}
export const ProductSizeToggle = ({ value, onChange }: ProductSizeToggleProps) => {
    return (
        <ToggleGroup
            className='flex-wrap justify-start'
            type='single'
            value={value}
            onValueChange={onChange}
        >
            {Object.entries(PRODUCT_SIZES).map(([key, label]) => (
                <ToggleGroupItem
                    className='size-11'
                    key={key}
                    value={key}
                    aria-label={`Toggle ${label}`}
                >
                    {label}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}
