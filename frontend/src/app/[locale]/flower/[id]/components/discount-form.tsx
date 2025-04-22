'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface DiscountFormProps {
    variant?: 'primary' | 'accent'
}

export const DiscountForm = ({ variant = 'accent' }: DiscountFormProps) => {
    const t = useTranslations('FlowerPage')
    const [discount, setDiscount] = useState('')

    return (
        <div className='flex items-center justify-between gap-10'>
            <Input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className={cn('max-w-56', {
                    'border-accent/50': variant === 'accent',
                    'border-primary/50': variant === 'primary'
                })}
                variant='underline'
                placeholder='Промокод/Дисконтна картка'
            />
            <Button
                disabled={!discount}
                variant={variant === 'accent' ? 'accent-outline' : 'outline'}
                size='sm'
            >
                {t('use-discount')}
            </Button>
        </div>
    )
}
