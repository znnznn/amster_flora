import { Advantages } from './components/advantages'
import { Categories } from './components/categories'
import { Faq } from './components/faq'
import { Map } from './components/map'
import { TickerTape } from './components/ticker-tape'
import { SocialsButtons } from '@/components/auth/socials-buttons'

export default function HomePage() {
    return (
        <>
            <TickerTape />
            <SocialsButtons />
            <Advantages />
            <Categories />
            <Faq />
            <Map />
        </>
    )
}
