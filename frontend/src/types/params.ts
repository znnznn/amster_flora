export interface LocaleParams {
    params: Promise<{ locale: string }>
}

export interface IdParams {
    params: Promise<{ id: string; locale: string }>
}
