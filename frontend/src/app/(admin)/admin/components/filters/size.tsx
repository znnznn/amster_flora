import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const SizeFilter = () => {
    return (
        <Select>
            <div className='space-y-1'>
                <Label>Розмір</Label>
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть розмір' />
                </SelectTrigger>
            </div>
            <SelectContent>
                <SelectItem value='s'>S</SelectItem>
                <SelectItem value='m'>M</SelectItem>
                <SelectItem value='l'>L</SelectItem>
                <SelectItem value='xl'>XL</SelectItem>
            </SelectContent>
        </Select>
    )
}
