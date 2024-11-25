import { Catalogue } from '../../components/catalogue'

import { TickerTape } from '@/app/(main)/components/ticker-tape'
import { Advantages } from './components/advantages'
import { Bouquets } from './components/bouquets'
import { Contacts } from './components/contacts'
import { Delivery } from './components/delivery'
import { Faq } from './components/faq'
import { Feedback } from './components/feedback'
import { Flowerpots } from './components/flowerpot'
import { Flowers } from './components/flowers'
import { Hero } from './components/hero'
import { Story } from './components/story'

const MainPage = () => {
    return (
        <>
            <TickerTape />
            <Hero />
            <Bouquets />
            <Flowerpots />
            <Catalogue
                className='mt-72'
                activeTab='promo'
            />
            <Advantages />
            <Story />
            <Flowers />
            <Faq />
            <Feedback />
            <Contacts />
            <Delivery />
        </>
    )
}

export default MainPage
