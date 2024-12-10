import { Flower } from './components/flower'
import { getProduct } from '@/api/products/products'
import type { Product, SingleVariantProduct } from '@/api/products/products.types'
import { Advantages } from '@/app/(client)/(main)/components/advantages'
import { Catalogue } from '@/components/catalogue'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { WatchedProductTracker } from '@/hooks/use-watched-products'

interface FlowerProps {
    params: {
        id: number[]
    }
}

export const generateMetadata = async ({ params }: FlowerProps) => {
    const [productId] = params.id
    const product = await getProduct(productId)

    return {
        title: product.name
    }
}

const flattenItem = (item: Product): SingleVariantProduct[] => {
    return item.variants.map((variant) => ({
        id: item.id,
        name: item.name,
        sku: item.sku,
        description: item.description,
        category: item.category,
        shop: item.shop,
        variant: variant,
        in_wish_list: item.in_wish_list,
        in_cart: item.in_cart
    }))
}

const FlowerPage = async ({ params }: FlowerProps) => {
    const [productId] = params.id

    const product = await getProduct(productId)

    const singleVariantProduct = flattenItem(product)[0]

    return (
        <>
            In cart: {product.in_cart ? 'true' : 'false'}
            <WatchedProductTracker productId={productId} />
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
                            <BreadcrumbPage>{singleVariantProduct?.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className='mt-4 text-center text-2xl font-semibold max-md:text-lg'>
                    {singleVariantProduct?.name}
                </h1>

                <Flower product={singleVariantProduct} />
            </section>
            <Advantages />
            <Catalogue
                className='mt-28 max-md:mt-16'
                activeTab='similar'
            />
        </>
    )
}

export default FlowerPage
