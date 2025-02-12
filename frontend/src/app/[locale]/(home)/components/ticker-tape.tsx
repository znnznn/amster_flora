import { useTranslations } from 'next-intl'
import Marquee from 'react-fast-marquee'

export const TickerTape = () => {
    const t = useTranslations('HomePage')

    return (
        <Marquee
            autoFill
            className='h-7 bg-accent'
        >
            <span className='px-5 font-medium'>{t('ticker-tape')}</span>
        </Marquee>
    )
}
