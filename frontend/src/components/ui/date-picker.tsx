'use client'

import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    date: Date | undefined
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    disabled?: boolean
}

export const DatePicker = ({
    date,
    setDate,
    className,
    disabled = false
}: DatePickerProps) => {
    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    size='sm'
                    className={cn(className, !date && 'text-muted-foreground')}
                >
                    <CalendarIcon className='mr-2 size-4' />
                    {date ? (
                        format(date, 'dd.MM.yyyy', {
                            locale: uk
                        })
                    ) : (
                        <span>DD-MM-YYYY</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
