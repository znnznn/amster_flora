import { CheckoutInfo } from './components/checkout-info'
import { StepperForm } from './components/stepper-form'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const CheckoutPage = () => {
    return (
        <section className='mt-12 pl-20 max-md:pl-16 max-sm:mt-8 max-sm:pl-6'>
            <Breadcrumb>
                <BreadcrumbList className='max-sm:justify-center'>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Головна</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/cart'>Кошик</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Оформлення замовлення</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='mt-4 text-center text-[28px] font-semibold'>
                Оформлення замовлення
            </h1>

            <div className='mt-20 flex items-start justify-between gap-x-20'>
                <StepperForm />
                <CheckoutInfo />
            </div>
        </section>
    )
}

export default CheckoutPage
