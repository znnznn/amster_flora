import type { ApiResponse } from '../api.types'
import { apiClient } from '../client'

import type { Contact, ContactPayload, ContactsQueryParams } from './contacts-types'

export const contactsService = {
    async get(params: Partial<ContactsQueryParams>) {
        const { data } = await apiClient.get<ApiResponse<Contact>>('/contact-us/', {
            params
        })
        return data
    },

    async create(payload: ContactPayload) {
        const { data: contact } = await apiClient.post<Contact>('/contact-us/', payload)
        return contact
    }
}
