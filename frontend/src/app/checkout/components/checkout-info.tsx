import Link from 'next/link'

import { CheckoutCard } from './checkout-card'
import { Button } from '@/components/ui/button'

export const CheckoutInfo = () => {
    return (
        <div className='w-full max-w-xl space-y-8 rounded-l-[22px] bg-accent p-10'>
            <div className='flex items-center justify-between gap-x-6'>
                <h2 className='text-[22px] font-medium text-primary'>Ваше замовлення</h2>
                <Button variant='link'>Редагувати</Button>
            </div>

            <ul>
                <li>
                    <CheckoutCard />
                </li>
            </ul>

            <div className='flex items-center justify-between gap-x-6'>
                <input
                    className='w-60 border-b border-b-primary bg-transparent px-0.5 pb-2 text-sm outline-none placeholder:text-muted-foreground'
                    type='text'
                    placeholder='Промокод/Дисконтна картка'
                />
                <Button
                    className='border-primary hover:bg-primary hover:text-primary-foreground'
                    variant='outline'>
                    Застосувати знижку
                </Button>
            </div>
            <div className='flex items-center justify-between gap-x-6'>
                <div className='flex items-center gap-x-4'>
                    <div className='flex size-10 items-center justify-center rounded-full border border-primary'>
                        B
                    </div>
                    <span className='text-lg'>35 бонусів</span>
                </div>
                <div className='flex flex-col items-end gap-y-4'>
                    <input
                        className='w-60 border-b border-b-primary bg-transparent px-0.5 pb-2 text-sm outline-none placeholder:text-muted-foreground'
                        type='text'
                        placeholder='Скільки бонусів списати'
                    />

                    <Link
                        className='text-xs transition-colors hover:text-background'
                        href='/bonuses'>
                        Що за бонуси?
                    </Link>
                </div>
            </div>

            <div>
                <div className='flex items-center justify-between gap-x-6'>
                    <span className='text-[22px] font-medium text-primary'>Знижка</span>
                    <span className='text-[22px] font-medium text-primary'>330 ₴</span>
                </div>
                <div className='mt-1 flex items-center justify-between gap-x-6'>
                    <span className='text-[22px] font-medium text-primary'>Разом</span>
                    <span className='text-[22px] font-medium text-primary'>2330 ₴</span>
                </div>
            </div>
        </div>
    )
}
