import { CartProduct } from '@/app/cart/components/cart-product'

const FavoritePage = () => {
    return (
        <section className='pr-20 max-md:pr-16 max-sm:mt-8 max-sm:pr-6'>
            <ul className='space-y-5'>
                <li>
                    <CartProduct />
                </li>
                <li>
                    <CartProduct />
                </li>
            </ul>
        </section>
    )
}

export default FavoritePage
