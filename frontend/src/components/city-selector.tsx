'use client'

import { ArrowLeft, ChevronDown, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { CITY_OPTIONS, DEFAULT_CITY } from '@/config/app'
import { useCookie } from '@/hooks/use-cookie'
import { cn } from '@/lib/utils'

interface CitySelectorProps extends React.HTMLAttributes<HTMLButtonElement> {
    withIcon?: boolean
}

export const CitySelector = ({ withIcon = false, className }: CitySelectorProps) => {
    const [mounted, setMounted] = useState(false)
    const [city, setCity] = useCookie('city', DEFAULT_CITY)
    const [isCitySelectionMode, setIsCitySelectionMode] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const t = useTranslations('Common.CitySelector')

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleCityChange = (newCity: string) => {
        setIsSheetOpen(false)
        setIsCitySelectionMode(false)
        setCity(newCity)
    }

    if (!mounted) {
        return null
    }

    const cityOptions = CITY_OPTIONS.filter((currentCity) => currentCity !== city)

    return (
        <Sheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}
        >
            <SheetTrigger
                className={cn(
                    'flex w-fit items-center gap-x-1 rounded-sm p-0.5 ring-offset-background transition-colors hover:bg-accent/10',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    className
                )}
            >
                {withIcon && <MapPin className='mr-1 size-4' />}
                <span className='font-medium'>{city}</span>
                <ChevronDown className='size-4' />
            </SheetTrigger>

            <SheetContent
                className='w-96 rounded-br-3xl border-r border-accent text-accent'
                side='top'
            >
                <div className='relative pt-4'>
                    {isCitySelectionMode && (
                        <button
                            onClick={() => setIsCitySelectionMode(false)}
                            className={cn(
                                'absolute left-4 top-4 rounded-sm text-base opacity-70',
                                'ring-offset-background transition-opacity hover:opacity-100',
                                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                                'disabled:pointer-events-none'
                            )}
                        >
                            <ArrowLeft className='size-4' />
                            <span className='sr-only'>{t('Back')}</span>
                        </button>
                    )}

                    <SheetHeader>
                        <SheetTitle className='text-center text-lg font-medium text-accent'>
                            {isCitySelectionMode
                                ? t('title')
                                : `${t('YourCity')} ${city}?`}
                        </SheetTitle>
                    </SheetHeader>

                    <div className='mt-6 flex items-center justify-center gap-x-8'>
                        {isCitySelectionMode ? (
                            <div className='flex flex-wrap justify-center gap-4'>
                                {cityOptions.map((cityOption) => (
                                    <Button
                                        key={cityOption}
                                        onClick={() => handleCityChange(cityOption)}
                                        className='w-28 !text-base'
                                        variant='accent-outline'
                                        size='sm'
                                    >
                                        {cityOption}
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <>
                                <Button
                                    onClick={() => handleCityChange(city)}
                                    className='w-20 !text-base'
                                    variant='accent-outline'
                                    size='sm'
                                >
                                    {t('Select')}
                                </Button>
                                <Button
                                    className='!text-base'
                                    onClick={() => setIsCitySelectionMode(true)}
                                    variant='accent-outline'
                                    size='sm'
                                >
                                    {t('ChangeCity')}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
