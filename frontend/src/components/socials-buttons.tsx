'use client'

import FacebookLogin, { type SuccessResponse } from '@greatsumini/react-facebook-login'
import { GoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'

import { buttonVariants } from './ui/button'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

interface SocialsButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
    setIsSheetOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const SocialsButtons = ({ className, setIsSheetOpen }: SocialsButtonsProps) => {
    const router = useRouter()

    const { googleLogin, facebookLogin } = useAuth()

    const handleGoogleLogin = (credentialResponse: any) => {
        googleLogin(credentialResponse.credential || '')
            .then(() => {
                setIsSheetOpen?.(false)
                router.refresh()
            })
            .catch((error) => console.error('Google login error:', error))
    }

    const handleFacebookLogin = (response: SuccessResponse) => {
        facebookLogin(response.accessToken)
            .then(() => {
                setIsSheetOpen?.(false)
                router.refresh()
            })
            .catch((error) => console.error('Facebook login error:', error))
    }

    return (
        <div
            className={cn(
                className,
                'flex flex-col items-center justify-center gap-y-1'
            )}>
            <span className='text-sm'>Увійти за допомогою</span>
            <div className='flex items-center gap-x-4'>
                <GoogleLogin
                    logo_alignment='center'
                    shape='square'
                    type='icon'
                    onSuccess={handleGoogleLogin}
                />

                <FacebookLogin
                    className={cn(
                        buttonVariants({ size: 'icon', variant: 'outline' }),
                        'rounded border-[#dadce0] bg-white hover:bg-white'
                    )}
                    appId='585697583978416'
                    autoLoad={false}
                    fields='name,email'
                    scope='email'
                    onSuccess={handleFacebookLogin}>
                    <FacebookIcon />
                </FacebookLogin>
            </div>
        </div>
    )
}

const FacebookIcon = () => (
    <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
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
)
