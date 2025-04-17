'use client'

import { useProducts } from '@/api/products'
import { ProductCard } from '@/components/product-card'

// export const generateMetadata = async ({ params }: LocaleParams) => {
//     const { locale } = await params

//     const t = await getTranslations({
//         locale,
//         namespace: 'Metadata.Catalogue'
//     })

//     return {
//         title: t('title')
//     }
// }

const CataloguePage = () => {
    const {
        productsQuery: { data }
    } = useProducts({})

    return (
        <div className='mt-10 flex items-center'>
            {data?.results?.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
}

export default CataloguePage
