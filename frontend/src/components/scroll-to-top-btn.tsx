'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const ScrollToTopBtn = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY >= 250)
        }

        window.addEventListener('scroll', handleScroll)

        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <Button
            size='icon'
            variant='accent-outline'
            className={cn(
                'fixed bottom-10 right-6 z-50 rounded-full bg-background text-accent transition-all duration-300',
                isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-10 opacity-0'
            )}
            onClick={scrollToTop}
            aria-label='Scroll to top'
        >
            <ArrowUp />
        </Button>
    )
}
