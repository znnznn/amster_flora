import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from 'react-query'

import { cartsService } from '@/api/carts/carts-service'
import type { Cart } from '@/api/carts/carts-types'

interface UseCartProps {
    cart: Cart
}

export const useCart = ({ cart }: UseCartProps) => {
    const queryClient = useQueryClient()
    const variantId = cart?.variant?.id

    const router = useRouter()

    const deleteCartMutation = useMutation({
        mutationFn: async (cartId: number) => {
            await cartsService.delete(cartId)
        },
        onMutate: async (cartId: number) => {
            await queryClient.cancelQueries(['carts'])
            const previousCarts = queryClient.getQueryData(['carts'])

            queryClient.setQueryData(['carts'], (old: any) => ({
                ...old,
                results: old.results.filter((cart: any) => cart.variant.id !== cartId)
            }))

            return { previousCarts }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['carts'], context?.previousCarts)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['carts'])
            router.refresh()
        }
    })

    const handleAddToCart = (amount: number) => {
        if (!variantId) return

        if (amount <= 0) {
            deleteCartMutation.mutate(variantId)
            return
        }
        cartsService.update(cart.id, { variant: variantId, amount })
    }

    return { handleAddToCart }
}
