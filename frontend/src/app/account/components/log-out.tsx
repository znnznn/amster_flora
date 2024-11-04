'use client'

import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LogOutButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const LogOutButton = ({ className }: LogOutButtonProps) => {
    const router = useRouter()

    const handleLogOut = () => {
        document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

        router.push('/')
        router.refresh()
    }
    return (
        <Button
            onClick={handleLogOut}
            className={cn(className)}
            variant='ghost'>
            <LogOutIcon />
            Вийти
        </Button>
    )
}
