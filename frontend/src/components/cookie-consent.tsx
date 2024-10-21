'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet'

export const CookieConsent = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    return (
        <Sheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}>
            <SheetContent
                className='inset-x-auto right-0 w-[560px] rounded-tl-3xl border-none bg-primary text-accent'
                side='bottom'>
                <SheetHeader>
                    <SheetTitle className='text-background'>
                        Використання файлів cookie
                    </SheetTitle>
                    <SheetDescription className='text-background'>
                        Цей сайт використовує файли cookie для покращення роботи.
                        Продовжуючи користуватися сайтом, ви погоджуєтеся з використанням
                        cookie
                    </SheetDescription>
                </SheetHeader>

                <div className='mt-6 flex items-center justify-between gap-x-8'>
                    <Button
                        onClick={() => setIsSheetOpen(false)}
                        size='lg'
                        variant='secondary'>
                        Прийняти усі
                    </Button>
                    <Button
                        onClick={() => setIsSheetOpen(false)}
                        size='lg'
                        variant='ghost'>
                        Відхилити не важливі
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
