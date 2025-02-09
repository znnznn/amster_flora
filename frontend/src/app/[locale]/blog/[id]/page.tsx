import type { IdParams } from '@/types/params'

export const generateMetadata = async ({ params }: IdParams) => {
    return {
        title: params?.id
    }
}

const BlogPostPage = ({ params }: IdParams) => {
    return <div>BlogPostPage {params?.id}</div>
}

export default BlogPostPage
