import { MapPinPlusInside } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const Address = () => {
    return (
        <div>
            <h2 className='text-2xl font-medium max-lg:mt-10'>Адреса доставки</h2>
            <Button
                className='mt-4'
                variant='ghost'>
                <MapPinPlusInside />
                Додати адресу
            </Button>
        </div>
    )
}
