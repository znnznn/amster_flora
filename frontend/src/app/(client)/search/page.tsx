import { SearchCommand } from './components/search-command'
import { getProducts } from '@/api/products/products'
import type { ProductQueryParams } from '@/api/products/products.types'

interface SearchPageProps {
    searchParams: ProductQueryParams
}
export const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const products = await getProducts({
        search: searchParams.search
    })

    return (
        <section className='container mx-auto mb-20 mt-12'>
            <SearchCommand initialProducts={products.results} />
        </section>
    )
}

export default SearchPage
