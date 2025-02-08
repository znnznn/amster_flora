'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
    const [queryClient] = useState(() => new QueryClient())

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
