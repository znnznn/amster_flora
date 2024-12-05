import { Address } from './components/address'
import { Passwords } from './components/passwords'
import { Profile } from './components/profile'

const ProfilePage = () => {
    return (
        <section className='container mt-8 w-full space-y-12 lg:mt-0 lg:pl-0'>
            <Profile />
            <Passwords />
            <Address />
        </section>
    )
}

export default ProfilePage
