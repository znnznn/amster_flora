import { Advantages } from './components/advantages'
import { Bouquets } from './components/bouqets'
import { Categories } from './components/categories'
import { Contacts } from './components/contacts/contacts'
import { Faq } from './components/faq'
import { Feedback } from './components/feedback'
import { Flowerpots } from './components/flowerpots'
import { Map } from './components/map'
import { TickerTape } from './components/ticker-tape'
import { Delivery } from './delivery'

const HomePage = () => {
    return (
        <>
            <TickerTape />
            <Bouquets />
            <Flowerpots />
            <Advantages />
            <Categories />
            <Faq />
            <Feedback />
            <Contacts />
            <Map />
            <Delivery />
        </>
    )
}

export default HomePage
