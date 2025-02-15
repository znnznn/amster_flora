interface ErrorWithMessage {
    response: {
        data: {
            detail: string
            email: string[]
            phone_number: string[]
            [key: string]: string | string[]
        }
    }
}

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as Record<string, unknown>).response === 'object'

export const getErrorMessage = (errorData: any): string => {
    if (typeof errorData === 'string') return errorData

    // If it's detail field, return it
    if (errorData.detail) return errorData.detail

    // For nested error objects, find the first error message
    if (typeof errorData === 'object') {
        // Get all values that are either strings or arrays with strings
        const errorMessages = Object.values(errorData).filter(
            (value) =>
                typeof value === 'string' ||
                (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string')
        )

        // Return the first error message found
        const firstError = errorMessages[0]
        if (Array.isArray(firstError)) return firstError[0]
        if (typeof firstError === 'string') return firstError
    }

    return 'Невідома помилка'
}
