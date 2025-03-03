import { Advantages } from './components/advantages'
import { Bouquets } from './components/bouqets'
import { Categories } from './components/categories'
import { Contacts } from './components/contacts/contacts'
import { Delivery } from './components/delivery'
import { Faq } from './components/faq'
import { Feedback } from './components/feedback'
import { Flowerpots } from './components/flowerpots'
import { Hero } from './components/hero'
import { Map } from './components/map'
import { TickerTape } from './components/ticker-tape'
import { ScrollToTopBtn } from '@/components/scroll-to-top-btn'

const HomePage = () => {
    return (
        <>
            <TickerTape />
            <Hero />
            <Bouquets />
            <Flowerpots />
            <Advantages />
            <Categories />
            <Faq />
            <Feedback />
            <Contacts />
            <Map />
            <Delivery />
            <ScrollToTopBtn />
        </>
    )
}

export default HomePage
