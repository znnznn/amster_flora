import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const inputVariants = cva(
    'flex h-12 w-full  bg-background px-6 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input rounded-md',
                underline:
                    'border-b border-b-primary bg-transparent px-0.5 pb-1 outline-none placeholder:text-muted-foreground'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <input
                className={cn(inputVariants({ variant }), className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input, inputVariants }
