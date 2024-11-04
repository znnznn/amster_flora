interface NewPasswordData {
    new_password1: string
    new_password2: string
}

export interface ChangePasswordData extends NewPasswordData {
    old_password: string
}

export interface ResetPasswordConfirmationData {
    uidb64: string
    token: string
    payload: NewPasswordData
}
