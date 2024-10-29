import { MapPinPlusInside } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const Address = () => {
    return (
        <Button
            className='mt-4'
            variant='ghost'>
            <MapPinPlusInside />
            Додати адресу
        </Button>
    )
}
