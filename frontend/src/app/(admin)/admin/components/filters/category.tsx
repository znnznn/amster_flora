import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const CategoryFilter = () => {
    return (
        <Select>
            <div className='space-y-1'>
                <Label>Категорія</Label>
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть категорію' />
                </SelectTrigger>
            </div>
            <SelectContent>
                <SelectItem value='light'>Light</SelectItem>
                <SelectItem value='dark'>Dark</SelectItem>
                <SelectItem value='system'>System</SelectItem>
            </SelectContent>
        </Select>
    )
}
