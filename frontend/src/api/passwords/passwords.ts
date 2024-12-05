import { api, publicApi } from '..'

import type {
    ChangePasswordPayload,
    ResetPasswordConfirmationPayload
} from './passwords.types'

export const resetPassword = async (email: string) => {
    const response = await publicApi.post('/users/password-reset/', {
        email
    })

    return response.data
}

export const resetPasswordWithPhone = async (phone: string) => {
    const response = await publicApi.post('/users/password-reset/', {
        phone
    })

    return response.data
}

export const changePassword = async (id: number, payload: ChangePasswordPayload) => {
    const response = await api.post(`/users/${id}/password-change/`, payload)

    return response.data
}

export const resetPasswordConfirm = async ({
    uidb64,
    token,
    payload
}: ResetPasswordConfirmationPayload) => {
    const response = await publicApi.post(
        `/users/password-reset-confirm/${uidb64}/${token}/`,
        payload
    )

    return response.data
}
