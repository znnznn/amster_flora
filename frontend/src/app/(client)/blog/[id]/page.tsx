import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

interface BlogPostProps {
    params: {
        id: number
    }
}

export const generateMetadata = async ({ params }: BlogPostProps) => {
    return {
        title: 'Блог | ' + params.id
    }
}

const BlogPostPage = ({ params }: BlogPostProps) => {
    return (
        <section className='mt-12 px-20 max-lg:px-16 max-md:px-10 max-sm:mt-8 max-sm:px-3'>
            <Breadcrumb>
                <BreadcrumbList className='max-sm:justify-center'>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Головна</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/blog'>Блог</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{params.id}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='mt-4 text-center text-2xl font-semibold max-md:text-lg'>
                {params.id}
            </h1>

            <div className='mt-10 flex flex-col gap-y-3 text-lg'>
                <p>Квіти: Різноманіття і Догляд за Красою Природи.</p>

                <p>
                    Ця стаття розповість про різноманітні види квітів, їх унікальні
                    характеристики та поради з догляду, щоб ваша садиба завжди була
                    сповнена яскравих кольорів і приємних ароматів.
                </p>
            </div>
        </section>
    )
}

export default BlogPostPage
