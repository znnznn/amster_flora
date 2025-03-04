import { NavList } from './nav-list'

export const AccountSidebar = () => {
    return (
        <aside className='h-[460px] w-[340px] rounded-r-3xl border py-6 pl-20 max-lg:hidden'>
            <nav>
                <NavList />
            </nav>
        </aside>
    )
}
