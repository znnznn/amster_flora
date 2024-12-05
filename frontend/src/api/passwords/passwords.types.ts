interface NewPasswordData {
    new_password1: string
    new_password2: string
}

export interface ChangePasswordPayload extends NewPasswordData {
    old_password: string
}

export interface ResetPasswordConfirmationPayload {
    uidb64: string
    token: string
    payload: NewPasswordData
}
