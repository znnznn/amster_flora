'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { toast } from 'sonner'

import { getErrorMessage, isErrorWithMessage } from '@/utils/errors'

export const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
    const t = useTranslations('Common.Errors')

    const [queryClient] = useState(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (error) => {
                        const isErrorMessage = isErrorWithMessage(error)
                        const errorMessage = isErrorMessage
                            ? getErrorMessage(error.response.data)
                            : t('UnknownError')

                        toast.error(errorMessage)
                    }
                }),
                defaultOptions: {
                    queries: {
                        retry: 1
                    }
                },
                mutationCache: new MutationCache({
                    onError: (error) => {
                        const isErrorMessage = isErrorWithMessage(error)
                        const errorMessage = isErrorMessage
                            ? getErrorMessage(error.response.data)
                            : t('UnknownError')

                        toast.error(errorMessage)
                    }
                })
            })
    )

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
