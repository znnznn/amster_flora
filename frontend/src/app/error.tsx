'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

const Error = ({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset: () => void
}) => {
    useEffect(() => {
        Sentry.captureException(error)
    }, [error])

    return (
        <div className='flex min-h-screen flex-col items-center justify-center px-6 py-24'>
            <Button onClick={reset}>Спробувати ще раз</Button>
        </div>
    )
}

export default Error
