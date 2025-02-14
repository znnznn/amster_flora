import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from './button'
import { Input } from './input'

interface PasswordWithRevealProps extends React.HTMLAttributes<HTMLInputElement> {
    variant?: 'underline' | 'default'
}

export const PasswordWithReveal = ({
    variant = 'default',
    ...props
}: PasswordWithRevealProps) => {
    const [revealPassword, setRevealPassword] = useState(false)

    return (
        <div className='relative'>
            <Input
                {...props}
                id='password'
                variant={variant}
                type={revealPassword ? 'text' : 'password'}
                placeholder='••••••••'
                className='pr-10'
            />
            <Button
                onClick={() => setRevealPassword(!revealPassword)}
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-4 top-1/2 size-6 -translate-y-1/2'
            >
                {revealPassword ? (
                    <EyeIcon className='!size-3.5' />
                ) : (
                    <EyeOffIcon className='!size-3.5' />
                )}
                <span className='sr-only'>Перемкнути видимість паролю</span>
            </Button>
        </div>
    )
}
