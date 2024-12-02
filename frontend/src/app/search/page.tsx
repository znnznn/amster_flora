'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'

import { SearchCommand } from './components/search-command'
import { getUsers } from '@/api/users/users'

export const SearchPage = () => {
    const [search, setSearch] = useState('')

    const { data: users, isFetching } = useQuery({
        queryKey: ['users', search],
        queryFn: () => getUsers({ search })
    })

    return (
        <section className='container mx-auto mb-20 mt-12'>
            <SearchCommand
                isFetching={isFetching}
                data={users?.results || []}
                setSearch={setSearch}
                search={search}
            />
        </section>
    )
}

export default SearchPage
