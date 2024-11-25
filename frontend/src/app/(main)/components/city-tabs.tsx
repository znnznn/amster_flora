'use client'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const setCityInCookie = (city: string) => {
    document.cookie = `city=${city}; path=/; max-age=31536000; SameSite=Strict`
}

const getCityFromCookie = () => {
    const cityCookie = document.cookie.split('; ').find((row) => row.startsWith('city='))
    return cityCookie ? cityCookie.split('=')[1] : null
}

const cityOptions = ['Київ', 'Львів', 'Рівне']

export const CityTabs = ({ className }: { className?: string }) => {
    const defaultCity = 'Рівне'
    const selectedCity = getCityFromCookie() || defaultCity

    return (
        <Tabs
            defaultValue={selectedCity}
            onValueChange={setCityInCookie}>
            <TabsList
                className={cn(
                    'flex h-fit flex-col gap-y-6 bg-transparent p-0',
                    className
                )}>
                {cityOptions.map((city) => (
                    <TabsTrigger
                        asChild
                        key={city}
                        value={city}>
                        <Button
                            size='lg'
                            className='w-40 rounded-xl data-[state=active]:border-b-[3px] data-[state=active]:border-r-[3px] data-[state=active]:border-primary data-[state=active]:bg-accent'>
                            {city}
                        </Button>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
