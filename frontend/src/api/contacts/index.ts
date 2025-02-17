import { useMutation, useQuery, useQueryClient } from 'react-query'

import { contactsService } from './contacts-service'
import type { ContactPayload, ContactsQueryParams } from './contacts-types'

export const CONTACTS_QUERY_KEY = ['contacts'] as const

export const useGetContacts = (params: ContactsQueryParams, options = {}) => {
    return useQuery({
        queryKey: [CONTACTS_QUERY_KEY, params],
        queryFn: () => contactsService.get(params),
        ...options
    })
}

export const useCreateContact = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: ContactPayload) => contactsService.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CONTACTS_QUERY_KEY })
        },
        ...options
    })
}
