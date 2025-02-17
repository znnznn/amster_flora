import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn('container mt-10 sm:mt-16 lg:mt-28', className)}
                {...props}
            >
                {children}
            </section>
        )
    }
)
