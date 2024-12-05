import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const flowerOptions = [
    { id: 'rose', label: 'Троянда' },
    { id: 'tulip', label: 'Тюльпан' },
    { id: 'lily', label: 'Лілія' }
]

export const FlowerFilter = () => {
    return (
        <Select>
            <div className='space-y-1'>
                <Label>Квіти</Label>
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть квіти' />
                </SelectTrigger>
            </div>
            <SelectContent>
                {flowerOptions.map((flowerOption) => (
                    <SelectItem
                        key={flowerOption.id}
                        value={flowerOption.id}>
                        {flowerOption.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
