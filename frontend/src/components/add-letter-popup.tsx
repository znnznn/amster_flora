import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

export const AddLetterPopup = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant='ghost'
                    size='sm'
                >
                    <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M20 19V5.00006C20 3.89549 19.1046 3.00006 18 3.00006H9C7.89543 3.00006 7 3.89549 7 5.00006L7 21H18C19.1046 21 20 20.1046 20 19Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M10 10.774C10 12.7461 13.3808 15 13.3808 15C13.3808 15 16.7616 12.7461 16.7616 10.774C16.7616 8.89472 14.2102 8.3196 13.3808 9.97625C12.5672 8.35118 10 8.92268 10 10.774Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>

                    <span>Підписати листівку</span>
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
