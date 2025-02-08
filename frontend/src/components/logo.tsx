import logo from "@/assets/images/logo.svg"
import { Link } from "@/i18n/routing"
import Image from "next/image"

interface LogoProps {
    className?: string
}
export const Logo = ({ className }: LogoProps) => {
    return (
        <Link className={className} href='/'>
            <Image priority src={logo} alt="Amster Flora" />
        </Link>
    )
}

