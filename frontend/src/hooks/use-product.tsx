import { cartsService } from '@/api/carts/carts-service'
import type { Product } from '@/api/products/products-types'

interface UseProductProps {
    singleVariantProduct: Product
}

export const useProduct = ({ singleVariantProduct }: UseProductProps) => {
    const variantId = singleVariantProduct?.variants?.[0]?.id

    const handleAddToCart = (amount: number) => {
        if (!variantId) return

        if (singleVariantProduct.in_cart) {
            if (amount <= 0) {
                cartsService.delete(variantId)
                return
            }
            cartsService.update(variantId, { variant: variantId, amount })
            return
        }

        if (amount > 0) {
            cartsService.create({ variant: variantId, amount })
        }
    }

    return { handleAddToCart }
}
