import { cn } from '@/lib/utils'

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const H2 = ({ children, className, ...props }: TypographyProps) => {
    return (
        <h2
            className={cn('text-lg font-semibold text-primary md:text-xl', className)}
            {...props}
        >
            {children}
        </h2>
    )
}
