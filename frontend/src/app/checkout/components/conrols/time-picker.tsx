import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { Clock } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { TimePickerInput } from '@/components/ui/datetime-picker'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface TimePickerProps {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export const TimePicker = ({ date, setDate }: TimePickerProps) => {
    const minuteRef = useRef<HTMLInputElement>(null)
    const hourRef = useRef<HTMLInputElement>(null)
    const secondRef = useRef<HTMLInputElement>(null)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className='h-12 w-full justify-start border border-input text-muted-foreground hover:bg-transparent'>
                    <Clock className='mr-2' />
                    {date ? (
                        format(date, 'HH:mm', {
                            locale: uk
                        })
                    ) : (
                        <span>Оберіть час</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='flex items-end gap-2'>
                    <div className='grid gap-1 text-center'>
                        <Label
                            htmlFor='hours'
                            className='text-xs'>
                            Година
                        </Label>
                        <TimePickerInput
                            max={21}
                            min={8}
                            picker='hours'
                            date={date}
                            setDate={setDate}
                            ref={hourRef}
                            onRightFocus={() => minuteRef.current?.focus()}
                        />
                    </div>
                    <div className='grid gap-1 text-center'>
                        <Label
                            htmlFor='minutes'
                            className='text-xs'>
                            Хвилини
                        </Label>
                        <TimePickerInput
                            min={0}
                            max={60}
                            picker='minutes'
                            date={date}
                            setDate={setDate}
                            ref={minuteRef}
                            onLeftFocus={() => hourRef.current?.focus()}
                            onRightFocus={() => secondRef.current?.focus()}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
