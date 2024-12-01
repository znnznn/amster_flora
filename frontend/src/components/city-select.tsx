'use client'

import { ArrowLeft, ChevronDown, MapPin } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { cityConfig } from '@/config/app'
import { useCookie } from '@/hooks/use-cookies'
import { cn } from '@/lib/utils'

interface CitySelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    withIcon?: boolean
}

export const CitySelect = ({ withIcon = false, className }: CitySelectProps) => {
    const [city, setCity] = useCookie('city', cityConfig.default)

    const [isCitySelectionMode, setIsCitySelectionMode] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const handleCityChange = (newCity: string) => {
        setIsSheetOpen(false)
        setIsCitySelectionMode(false)
        setCity(newCity)
    }

    return (
        <Sheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}>
            <SheetTrigger
                className={cn(
                    'flex w-fit items-center gap-x-1 rounded-sm p-0.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    className
                )}>
                {withIcon ? <MapPin className='mr-1' /> : ''}
                <span className='font-medium'>{city}</span>
                <ChevronDown />
            </SheetTrigger>
            <SheetContent
                className='w-96 rounded-br-3xl border-r border-accent text-accent'
                side='top'>
                {isCitySelectionMode && (
                    <button
                        onClick={() => setIsCitySelectionMode(false)}
                        className='absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
                        <ArrowLeft className='size-4' />
                        <span className='sr-only'>Назад</span>
                    </button>
                )}

                <SheetHeader className='mt-4'>
                    <SheetTitle className='text-center text-lg font-medium text-accent'>
                        {isCitySelectionMode
                            ? 'Виберіть місто'
                            : `Ваше місто доставки ${city}?`}
                    </SheetTitle>
                </SheetHeader>

                <div className='mt-6 flex items-center justify-center gap-x-8'>
                    {isCitySelectionMode ? (
                        cityConfig.options
                            .filter((currentCity) => currentCity !== city)
                            .map((city) => (
                                <Button
                                    key={city}
                                    onClick={() => handleCityChange(city)}
                                    className='w-28'
                                    variant='outline'>
                                    {city}
                                </Button>
                            ))
                    ) : (
                        <>
                            <Button
                                onClick={() => handleCityChange(city)}
                                className='w-20'
                                variant='outline'>
                                Так
                            </Button>
                            <Button
                                onClick={() => setIsCitySelectionMode(true)}
                                variant='ghost'>
                                Ні, змінити місто
                            </Button>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
