import { Flower } from './components/flower'
import { Advantages } from '@/app/(main)/components/advantages'
import { Catalogue } from '@/components/catalogue'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

interface FlowerProps {
    params: {
        id: number
    }
}

export const generateMetadata = async ({ params }: FlowerProps) => {
    return {
        title: params.id
    }
}

const FlowerPage = ({ params }: FlowerProps) => {
    return (
        <>
            <section className='mt-12 max-sm:mt-8'>
                <Breadcrumb className='px-20 max-lg:px-16 max-md:px-10 max-sm:px-3'>
                    <BreadcrumbList className='max-sm:justify-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Головна</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/catalogue'>Букети</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{params.id}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className='mt-4 text-center text-[28px] font-semibold max-md:text-lg'>
                    {params.id}
                </h1>

                <Flower />
            </section>

            <Advantages />

            <Catalogue
                className='mt-28'
                activeTab='similar'
            />
        </>
    )
}

export default FlowerPage
