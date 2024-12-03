import { Address } from './components/address'
import { ProfileForm } from './components/form'

const ProfilePage = () => {
    return (
        <section className='container mt-8 w-full lg:mt-0 lg:pl-0'>
            <h2 className='text-2xl font-medium'>Персональні дані</h2>
            <ProfileForm />

            <h2 className='mt-14 text-2xl font-medium max-lg:mt-10'>Персональні дані</h2>
            <Address />
        </section>
    )
}

export default ProfilePage
