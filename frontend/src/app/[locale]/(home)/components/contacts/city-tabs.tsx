'use client'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CITY_OPTIONS, DEFAULT_CITY } from '@/config/app'
import { useCookie } from '@/hooks/use-cookie'
import { cn } from '@/lib/utils'

interface CityTabsProps {
    className?: string
}
export const CityTabs = ({ className }: CityTabsProps) => {
    const [city, setCity] = useCookie<string>(
        'city',
        DEFAULT_CITY,
        { maxAge: 31536000 } // One year in seconds
    )

    return (
        <Tabs
            value={city}
            onValueChange={setCity}
        >
            <TabsList
                className={cn(
                    'flex h-fit flex-col gap-y-6 bg-transparent p-0',
                    className
                )}
            >
                {CITY_OPTIONS.map((city) => (
                    <TabsTrigger
                        asChild
                        key={city}
                        value={city}
                    >
                        <Button className='w-40 data-[state=active]:bg-accent'>
                            {city}
                        </Button>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
