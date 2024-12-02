import { CommandLoading } from 'cmdk'
import { Loader2, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import type { User } from '@/api/users/users.types'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList
} from '@/components/ui/command'

interface SearchCommandProps {
    data: User[]
    setSearch: React.Dispatch<React.SetStateAction<string>>
    search: string
    isFetching: boolean
}

export const SearchCommand = ({
    data,
    setSearch,
    isFetching,
    search: externalSearch
}: SearchCommandProps) => {
    const [internalSearch, setInternalSearch] = useState(externalSearch)

    const debouncedSearch = useDebouncedCallback(setSearch, 300)

    const handleSearchChange = useCallback(
        (value: string) => {
            setInternalSearch(value)
            debouncedSearch(value)
        },
        [debouncedSearch]
    )

    const handleClearSearch = useCallback(() => {
        setInternalSearch('')
        setSearch('')
    }, [setSearch])

    return (
        <Command className='mx-auto rounded-lg border bg-primary text-accent shadow-md md:min-w-[450px] md:max-w-3xl'>
            <div
                className='flex items-center border-b border-b-accent px-3'
                cmdk-input-wrapper=''>
                <Search className='mr-2 size-4 shrink-0' />
                <input
                    value={internalSearch}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder='Букет на день народження'
                    className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                />
                {isFetching && <Loader2 className='ml-2 size-4 animate-spin' />}
                {!isFetching && internalSearch ? (
                    <button
                        onClick={handleClearSearch}
                        className='text-gray-400 hover:text-gray-300'>
                        <X className='h-4 w-4' />
                        <span className='sr-only'>Clear search</span>
                    </button>
                ) : null}
            </div>
            <CommandList className='p-1'>
                {isFetching ? (
                    <CommandLoading className='py-6 text-center text-sm'>
                        Завантаження...
                    </CommandLoading>
                ) : (
                    <>
                        <CommandEmpty>Товарів не знайдено</CommandEmpty>
                        <CommandGroup>
                            {data.map((item) => (
                                <Link
                                    href={`/flower/${item.id}`}
                                    key={item.id}>
                                    <CommandItem
                                        className='py-3 text-primary-foreground'
                                        onSelect={() => {
                                            console.log(item)
                                        }}>
                                        {item.email}
                                    </CommandItem>
                                </Link>
                            ))}
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </Command>
    )
}
