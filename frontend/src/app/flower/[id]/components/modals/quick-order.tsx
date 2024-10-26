import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

export const QuickOrderModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost'>Швидке замовлення</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Цінуємо твій час</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
