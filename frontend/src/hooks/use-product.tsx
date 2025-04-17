import { cartsService } from '@/api/carts/carts-service'
import type { Product } from '@/api/products/products-types'

interface UseProductProps {
    singleVariantProduct: Product
}

export const useProduct = ({ singleVariantProduct }: UseProductProps) => {
    const handleAddToCart = (amount: number) => {
        if (singleVariantProduct.in_cart) {
            cartsService.delete(singleVariantProduct?.variants?.[0]?.id)
        } else {
            cartsService.create({
                variant: singleVariantProduct?.variants?.[0]?.id,
                amount
            })
        }
    }

    return {
        handleAddToCart
    }
}
