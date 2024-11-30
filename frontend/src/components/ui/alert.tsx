import { type VariantProps, cva } from 'class-variance-authority'
import { X } from 'lucide-react'
import * as React from 'react'

import { Button } from './button'
import { cn } from '@/lib/utils'

const alertVariants = cva(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground &_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                success:
                    'border-green-500 bg-green-50 text-green-700 [&>svg]:text-green-700',
                destructive:
                    'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> &
        VariantProps<typeof alertVariants> & {
            closable?: boolean
        }
>(({ className, variant, closable = false, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)

    if (!isVisible) return null // Don't render if not visible

    const handleClose = () => {
        setIsVisible(false)
    }

    return (
        <div
            ref={ref}
            role='alert'
            className={cn(alertVariants({ variant }), className)}
            {...props}>
            {closable && (
                <Button
                    size='icon'
                    variant='ghost'
                    onClick={handleClose}
                    className='absolute right-2 top-2 size-5 hover:bg-muted/10 [&_svg]:size-3'
                    aria-label='Close'>
                    <X className='text-muted' />
                </Button>
            )}
            {props.children}
        </div>
    )
})
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn('mb-1 font-medium leading-none tracking-tight', className)}
        {...props}
    />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('text-sm [&_p]:leading-relaxed', className)}
        {...props}
    />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle }
