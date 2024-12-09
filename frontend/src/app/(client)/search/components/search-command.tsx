'use client'

import { CommandLoading } from 'cmdk'
import { Loader2, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { useDebouncedCallback } from 'use-debounce'

import { flattenItem } from '../../catalogue/components/products-list'

import { getProducts } from '@/api/products/products'
import type { Product } from '@/api/products/products.types'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList
} from '@/components/ui/command'

interface SearchCommandProps {
    initialProducts: Product[]
}

export const SearchCommand = ({ initialProducts }: SearchCommandProps) => {
    const [search, setSearch] = useQueryState('search', {
        defaultValue: '',
        shallow: false
    })

    const { data: products, isFetching } = useQuery({
        queryKey: ['products', search],
        queryFn: async () => {
            const response = await getProducts({
                search: search
            })
            return response.results
        },
        initialData: initialProducts
    })

    const flattenProducts = products?.flatMap(flattenItem)

    const debouncedSearch = useDebouncedCallback(setSearch, 300)

    const handleSearchChange = useCallback(
        (value: string) => {
            setSearch(value)
            debouncedSearch(value)
        },
        [debouncedSearch]
    )

    const handleClearSearch = useCallback(() => {
        setSearch('')
    }, [])

    return (
        <Command className='mx-auto rounded-lg border bg-primary text-accent shadow-md md:min-w-[450px] md:max-w-3xl'>
            <div
                className='flex items-center border-b border-b-accent px-3'
                cmdk-input-wrapper=''>
                <Search className='mr-2 size-4 shrink-0' />
                <input
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder='Букет на день народження'
                    className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                />
                {isFetching && <Loader2 className='ml-2 size-4 animate-spin' />}
                {!isFetching && search ? (
                    <button
                        onClick={handleClearSearch}
                        className='text-gray-400 hover:text-gray-300'>
                        <X className='size-4' />
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
                            {flattenProducts?.map((item) => (
                                <Link
                                    prefetch
                                    href={`/flower/${item.variant.id}`}
                                    key={item.variant.id}>
                                    <CommandItem
                                        value={item.variant.id.toString()}
                                        className='cursor-pointer py-3 text-primary-foreground'>
                                        {item.name}
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
