'use client'

import { Button } from '@/components/ui/button'

const Error = ({ reset }: { reset: () => void }) => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center px-6 py-24'>
            <Button onClick={reset}>Спробувати ще раз</Button>
        </div>
    )
}

export default Error

