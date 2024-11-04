import { publicApi } from '..'

import type { ChangePasswordData, ResetPasswordConfirmationData } from './passwords.types'

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

export const changePassword = async (id: number, payload: ChangePasswordData) => {
    const response = await publicApi.post(`/users/${id}/password-change/`, payload)

    return response.data
}

export const resetPasswordConfirm = async ({
    uidb64,
    token,
    payload
}: ResetPasswordConfirmationData) => {
    const response = await publicApi.post(
        `/users/password-reset-confirm/${uidb64}/${token}/`,
        payload
    )

    return response.data
}
