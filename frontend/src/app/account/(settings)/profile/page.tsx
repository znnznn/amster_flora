import { Address } from './components/address'
import { ProfileForm } from './components/form'

const ProfilePage = () => {
    return (
        <section className='pr-20 max-md:pr-16 max-sm:mt-8 max-sm:pr-6'>
            <h2 className='text-[22px] font-medium'>Персональні дані</h2>
            <ProfileForm />

            <h2 className='mt-14 text-[22px] font-medium'>Персональні дані</h2>
            <Address />
        </section>
    )
}

export default ProfilePage
