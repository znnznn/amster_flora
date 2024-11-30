import { api } from '..'

export const addContactUs = async(payload: ContactUsPayload) => {
    const response = await api.post('/contact-us/', payload)

    return response.data
}
