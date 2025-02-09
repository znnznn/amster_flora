import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Section = ({ children, className, ...props }: SectionProps) => {
    return (
        <section
            className={cn('container mt-10 sm:mt-16 lg:mt-28', className)}
            {...props}
        >
            {children}
        </section>
    )
}
