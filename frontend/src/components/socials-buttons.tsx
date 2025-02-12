'use client'

import { GoogleLogin } from '@react-oauth/google'

import { Button } from './ui/button'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

interface SocialsButtonsProps {
    className?: string
    onSuccess?: () => void
}

export const SocialsButtons = ({ className, onSuccess }: SocialsButtonsProps) => {
    const { googleLogin } = useAuth()

    return (
        <div
            className={cn(className, 'flex flex-col items-center justify-center gap-y-1')}
        >
            <span className='text-sm text-background'>Увійти за допомогою</span>

            <div className='flex items-center gap-x-4'>
                <GoogleLogin
                    logo_alignment='center'
                    shape='square'
                    type='icon'
                    onSuccess={(credentialResponse) => {
                        googleLogin({
                            token: credentialResponse?.credential || ''
                        })
                        onSuccess?.()
                    }}
                />

                <Button
                    className='size-12 hover:bg-accent/20 [&_svg]:size-6'
                    type='button'
                    variant='link'
                >
                    <svg
                        width='32'
                        height='32'
                        viewBox='0 0 32 32'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <g clipPath='url(#clip0_6_98)'>
                            <path
                                d='M32 16.334C32 7.4975 24.8365 0.333984 16 0.333984C7.16352 0.333984 0 7.4975 0 16.334C0 23.8373 5.16608 30.1337 12.135 31.8629V21.2236H8.83584V16.334H12.135V14.2271C12.135 8.78135 14.5997 6.25718 19.9462 6.25718C20.96 6.25718 22.7091 6.45622 23.4246 6.65462V11.0866C23.047 11.0469 22.391 11.0271 21.5763 11.0271C18.953 11.0271 17.9392 12.021 17.9392 14.6047V16.334H23.1654L22.2675 21.2236H17.9392V32.2169C25.8605 31.2601 32 24.5145 32 16.334Z'
                                fill='#0866FF'
                            />
                        </g>
                        <defs>
                            <clipPath id='clip0_6_98'>
                                <rect
                                    width='32'
                                    height='32'
                                    fill='white'
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </Button>
            </div>
        </div>
    )
}
