import Marquee from 'react-fast-marquee'

import { Advantages } from './components/advantages'
import { Categories } from './components/categories'
import { Faq } from './components/faq'
import { Map } from './components/map'

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

const TickerTape = () => {
    return (
        <Marquee
            autoFill
            className='h-7 bg-accent'
            pauseOnHover
        >
            <span className='px-5 font-medium'>працюємо на генераторах </span>
        </Marquee>
    )
}
