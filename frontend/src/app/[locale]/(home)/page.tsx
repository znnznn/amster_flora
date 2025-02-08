import Marquee from "react-fast-marquee";

export default function HomePage() {
    return (
        <>
            <Marquee autoFill className="bg-accent h-7" pauseOnHover>
                <span className="font-medium px-5">працюємо на генераторах </span>
            </Marquee>
        </>
    )
}
