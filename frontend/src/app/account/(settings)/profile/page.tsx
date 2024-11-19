import { Address } from './components/address'
import { ProfileForm } from './components/form'

const ProfilePage = () => {
    return (
        <section className='pr-20 max-lg:px-20 max-md:px-16 max-sm:mt-8 max-sm:px-6'>
            <h2 className='text-[22px] font-medium'>Персональні дані</h2>
            <ProfileForm />

            <h2 className='mt-14 text-[22px] font-medium max-lg:mt-10'>
                Персональні дані
            </h2>
            <Address />
        </section>
    )
}

export default ProfilePage
