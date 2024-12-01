'use client'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cityConfig } from '@/config/app'
import { useCookie } from '@/hooks/use-cookies'
import { cn } from '@/lib/utils'

export const CityTabs = ({ className }: { className?: string }) => {
    const [city, setCity] = useCookie('city', cityConfig.default)

    return (
        <Tabs
            value={city}
            onValueChange={setCity}>
            <TabsList
                className={cn(
                    'flex h-fit flex-col gap-y-6 bg-transparent p-0',
                    className
                )}>
                {cityConfig.options.map((cityOption) => (
                    <TabsTrigger
                        asChild
                        key={cityOption}
                        value={cityOption}>
                        <Button
                            size='lg'
                            className='w-40 rounded-xl data-[state=active]:border-b-[3px] data-[state=active]:border-r-[3px] data-[state=active]:border-primary data-[state=active]:bg-accent'>
                            {cityOption}
                        </Button>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
