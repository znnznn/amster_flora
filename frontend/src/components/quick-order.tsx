import { useTranslations } from 'next-intl'

import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

export const QuickOrder = () => {
    const t = useTranslations('FlowerPage')

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className='text-accent underline hover:text-white'
                    variant='link'
                    size='sm'
                >
                    {t('quickOrder')}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
