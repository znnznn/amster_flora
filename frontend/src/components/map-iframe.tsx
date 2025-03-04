import { cn } from '@/lib/utils'

interface MapIframeProps {
    className?: string
}

export const MapIframe = ({ className }: MapIframeProps) => {
    return (
        <iframe
            className={cn('rounded-3xl border-none', className)}
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.7586988519447!2d26.271852576726296!3d50.63159927162738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f15c3b586a6f9%3A0x578ed8236f6d0a32!2zQU1TVEVSIC0g0JzQsNCz0LDQt9C40L0g0JrQstGW0YLRltCy!5e0!3m2!1sru!2sua!4v1729455794707!5m2!1sru!2sua'
            width='600'
            height='450'
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
    )
}
