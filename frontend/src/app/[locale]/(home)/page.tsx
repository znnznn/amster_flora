import { Advantages } from './components/advantages'
import { Categories } from './components/categories'
import { Faq } from './components/faq'
import { Map } from './components/map'
import { TickerTape } from './components/ticker-tape'

export default function HomePage() {
    return (
        <>
            <TickerTape />
            <Advantages />
            <Categories />
            <Faq />
            <Map />
        </>
    )
}
