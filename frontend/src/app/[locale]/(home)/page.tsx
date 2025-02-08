import Marquee from 'react-fast-marquee'

export default function HomePage() {
    return (
        <>
            <Marquee
                autoFill
                className='h-7 bg-accent'
                pauseOnHover
            >
                <span className='px-5 font-medium'>працюємо на генераторах </span>
            </Marquee>
        </>
    )
}
