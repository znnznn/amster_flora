import type { IdParams } from '@/types/params'

export const generateMetadata = async ({ params }: IdParams) => {
    const { id } = await params

    return {
        title: id
    }
}

const FlowerPage = async ({ params }: IdParams) => {
    const { id } = await params

    return <div className='mt-10 flex h-10 w-10 items-center'>FlowerPage {id}</div>
}

export default FlowerPage
