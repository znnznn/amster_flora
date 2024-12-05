import { CheckCircle } from 'lucide-react'

import { Alert, AlertDescription } from './ui/alert'

interface FormMessageProps {
    message?: string
}
export const SuccessFormMessage = ({
    message = 'Успішно виконано'
}: FormMessageProps) => {
    return (
        <Alert
            closable
            className='mt-4'
            variant='success'>
            <CheckCircle className='size-4' />
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}

export const ErrorFormMessage = ({ message = 'Щось пішло не так' }: FormMessageProps) => {
    return (
        <Alert
            closable
            variant='destructive'
            className='mt-4'>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
