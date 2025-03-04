import { MapPinPlusInside } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const AddAddress = () => {
    return (
        <Button
            className='mt-16'
            variant='ghost'
        >
            <MapPinPlusInside className='!size-8' />
            Додати адресу
        </Button>
    )
}
