'use client'

import { LogOutIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LogOutButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const LogOutButton = ({ className }: LogOutButtonProps) => {
    return (
        <Button
            className={cn(className)}
            variant='ghost'>
            <LogOutIcon />
            Вийти
        </Button>
    )
}
