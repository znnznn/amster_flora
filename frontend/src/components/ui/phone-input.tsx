import type { VariantProps } from 'class-variance-authority'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import ua from 'react-phone-number-input/locale/ua'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command'
import { Input, inputVariants } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
    Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
        onChange?: (value: RPNInput.Value) => void
    } & VariantProps<typeof inputVariants>

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
    React.ElementRef<typeof RPNInput.default>,
    PhoneInputProps
>(({ className, onChange, variant, ...props }, ref) => {
    return (
        <RPNInput.default
            ref={ref}
            defaultCountry='UA'
            labels={ua}
            className={cn(
                'flex overflow-clip rounded-2xl border',
                'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
                variant === 'underline' &&
                    'focus-within:border-b-2 focus-within:border-primary focus-within:ring-0 focus-within:ring-offset-0',
                className
            )}
            flagComponent={FlagComponent}
            countrySelectComponent={
                variant === 'underline' ? UnderlineCountrySelect : CountrySelect
            }
            inputComponent={
                variant === 'underline' ? UnderlineInputComponent : InputComponent
            }
            smartCaret={false}
            limitMaxLength
            international
            maxLength={16}
            placeholder='Номер телефону'
            /**
             * Handles the onChange event.
             *
             * react-phone-number-input might trigger the onChange event as undefined
             * when a valid phone number is not entered. To prevent this,
             * the value is coerced to an empty string.
             *
             * @param {E164Number | undefined} value - The entered value
             */
            onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
            {...props}
        />
    )
})
PhoneInput.displayName = 'PhoneInput'

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
    ({ className, ...props }, ref) => (
        <Input
            className={cn(
                'rounded-r-md rounded-s-none border-none !outline-none !ring-0 !ring-offset-0',
                className
            )}
            {...props}
            ref={ref}
        />
    )
)
InputComponent.displayName = 'InputComponent'

const UnderlineInputComponent = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
    <Input
        variant='underline'
        className={cn(className)}
        {...props}
        ref={ref}
    />
))

type CountryEntry = { label: string; value: RPNInput.Country | undefined }

type CountrySelectProps = {
    disabled?: boolean
    value: RPNInput.Country
    options: CountryEntry[]
    onChange: (country: RPNInput.Country) => void
}

const CountrySelect = ({
    disabled,
    value: selectedCountry,
    options: countryList,
    onChange
}: CountrySelectProps) => {
    const sanitizedCountryList = countryList.filter(
        ({ value }) => !value?.includes('RU') && !value?.includes('BY')
    )
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type='button'
                    variant='ghost'
                    className='flex h-[54px] gap-1 !rounded-none bg-background px-3 hover:bg-accent'
                    disabled={disabled}
                >
                    <FlagComponent
                        country={selectedCountry}
                        countryName={selectedCountry}
                    />
                    <ChevronsUpDown
                        className={cn(
                            '-mr-2 size-4 opacity-50',
                            disabled ? 'hidden' : 'opacity-100'
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align='start'
                className='w-80 p-0'
            >
                <Command>
                    <CommandInput placeholder='Введіть назву або код країни...' />
                    <CommandList>
                        <ScrollArea className='h-72'>
                            <CommandEmpty>Країн не знайдено.</CommandEmpty>
                            <CommandGroup>
                                {sanitizedCountryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                        />
                                    ) : null
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
const UnderlineCountrySelect = ({
    disabled,
    value: selectedCountry,
    options: countryList,
    onChange
}: CountrySelectProps) => {
    const sanitizedCountryList = countryList.filter(
        ({ value }) => !value?.includes('RU') && !value?.includes('BY')
    )
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type='button'
                    variant='ghost'
                    className='flex h-[54px] gap-1 rounded-b-none rounded-t-[2px] border-x-0 border-t-0 border-primary px-3'
                    disabled={disabled}
                >
                    <FlagComponent
                        country={selectedCountry}
                        countryName={selectedCountry}
                    />
                    <ChevronsUpDown
                        className={cn(
                            '-mr-2 size-4 opacity-50',
                            disabled ? 'hidden' : 'opacity-100'
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align='start'
                className='w-[300px] p-0'
            >
                <Command>
                    <CommandInput placeholder='Введіть назву або код країни...' />
                    <CommandList>
                        <ScrollArea className='h-72'>
                            <CommandEmpty>Країн не знайдено.</CommandEmpty>
                            <CommandGroup>
                                {sanitizedCountryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                        />
                                    ) : null
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

interface CountrySelectOptionProps extends RPNInput.FlagProps {
    selectedCountry: RPNInput.Country
    onChange: (country: RPNInput.Country) => void
}

const CountrySelectOption = ({
    country,
    countryName,
    selectedCountry,
    onChange
}: CountrySelectOptionProps) => {
    return (
        <CommandItem
            className='gap-2 rounded-md'
            onSelect={() => onChange(country)}
        >
            <FlagComponent
                country={country}
                countryName={countryName}
            />
            <span className='flex-1 text-sm'>{countryName}</span>
            <span className='text-sm text-foreground/50'>{`+${RPNInput.getCountryCallingCode(country)}`}</span>
            <CheckIcon
                className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
            />
        </CommandItem>
    )
}

interface FlagComponentProps extends RPNInput.FlagProps {
    className?: string
}

export const FlagComponent = ({
    country,
    countryName,
    className
}: FlagComponentProps) => {
    const Flag = flags[country]

    return (
        <span
            className={cn(
                'rounded flex size-5 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground/20 [&_svg]:size-full [&_svg]:scale-150',
                className
            )}
        >
            {Flag ? <Flag title={countryName} /> : country}
        </span>
    )
}

export { PhoneInput }
