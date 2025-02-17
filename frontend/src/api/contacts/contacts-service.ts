import type { ApiResponse } from '../api.types'
import { clientApi } from '../client'

import type { Contact, ContactPayload, ContactsQueryParams } from './contacts-types'

export const contactsService = {
    async get(params: Partial<ContactsQueryParams>) {
        const { data } = await clientApi.get<ApiResponse<Contact>>('/contact-us/', {
            params
        })
        return data
    },

    async create(payload: ContactPayload) {
        const { data: contact } = await clientApi.post<Contact>('/contact-us/', payload)
        return contact
    }
}
