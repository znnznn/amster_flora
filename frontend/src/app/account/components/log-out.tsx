'use client'

import { LogOutIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

interface LogOutButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const LogOutButton = ({ className }: LogOutButtonProps) => {
    const {logout} = useAuth()


    return (
        <Button
            onClick={logout}
            className={cn(className)}
            variant='ghost'>
            <LogOutIcon />
            Вийти
        </Button>
    )
}
