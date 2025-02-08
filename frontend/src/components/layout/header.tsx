import { Logo } from "@/components/logo"
import { Link } from "@/i18n/routing"

export const Header = () => {
    return (
        <header className="bg-primary">
            <div className="bg-accent">
                <div className="container h-7 flex items-center">
                    <Link className="text-primary hover:underline transition-all font-medium" href='tel:+380687778893'>
                        +380 068 777 88 93
                    </Link>
                </div>
            </div>
            <div className="container h-[70px] flex items-center ">
                <Logo />
            </div>
        </header>
    )
}
