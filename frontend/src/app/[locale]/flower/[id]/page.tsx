import type { IdParams } from '@/types/params'

export const generateMetadata = async ({ params }: IdParams) => {
    return {
        title: params?.id
    }
}

const FlowerPage = ({ params }: IdParams) => {
    return (
        <div className='mt-10 flex h-10 w-10 items-center'>FlowerPage {params?.id}</div>
    )
}

export default FlowerPage
