'use client'

import Image from 'next/image'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { langConfig } from '@/config/app'
import { useCookie } from '@/hooks/use-cookies'
import { cn } from '@/lib/utils'

interface LangSelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    withIcon?: boolean
}

export const LangSelect = ({ withIcon = true, className }: LangSelectProps) => {
    const [lang, setLang] = useCookie('lang', langConfig.default)

    return (
        <Select
            defaultValue={lang}
            onValueChange={setLang}>
            <SelectTrigger
                className={cn(
                    'w-32 border-none bg-transparent p-0 font-medium focus:ring-0 focus:ring-offset-0',
                    className
                )}>
                <SelectValue placeholder='Select a fruit' />
            </SelectTrigger>
            <SelectContent className='border-primary bg-accent text-primary'>
                {langConfig.options.map((lang) => (
                    <SelectItem
                        key={lang.value}
                        className='font-medium hover:bg-primary hover:text-accent-foreground'
                        value={lang.value}>
                        <div className='flex items-center gap-x-2'>
                            <Image
                                className={withIcon ? '' : 'hidden'}
                                width={16}
                                height={16}
                                src={lang.icon}
                                alt={lang.label}
                            />
                            {lang.label}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
