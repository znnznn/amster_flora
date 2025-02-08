interface Params {
    id: string
}

const BlogPostPage = ({ params }: { params: Params }) => {
    return <div>BlogPostPage {params.id}</div>
}

export default BlogPostPage
