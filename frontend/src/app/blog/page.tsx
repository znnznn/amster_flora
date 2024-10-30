import Link from 'next/link'

import { BlogPost } from './components/blog-post'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const BlogPage = () => {
    return (
        <section className='mt-12 px-20 max-md:px-16 max-sm:mt-8 max-sm:px-6'>
            <Breadcrumb>
                <BreadcrumbList className='max-sm:justify-center'>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Головна</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Блог</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='mt-4 text-center text-[28px] font-semibold'>Блог</h1>

            <ul className='mt-10 space-y-5'>
                <li>
                    <Link href='/blog/post1'>
                        <BlogPost />
                    </Link>
                </li>
                <li>
                    <Link href='/blog/post2'>
                        <BlogPost />
                    </Link>
                </li>
            </ul>
        </section>
    )
}

export default BlogPage
