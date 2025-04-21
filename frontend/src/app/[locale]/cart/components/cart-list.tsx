'use client'

import { useQuery } from 'react-query'

import { CartCard } from './cart-card'
import type { ApiResponse } from '@/api/api.types'
import { cartsService } from '@/api/carts/carts-service'
import type { Cart } from '@/api/carts/carts-types'

interface CartListProps {
    initialCartResponse: ApiResponse<Cart>
}
export const CartList = ({ initialCartResponse }: CartListProps) => {
    const { data: carts } = useQuery({
        queryKey: ['carts'],
        queryFn: () => cartsService.get({}),
        initialData: initialCartResponse
    })

    return (
        <div className='space-y-5'>
            {carts?.results?.map((cart) => (
                <CartCard
                    key={cart.id}
                    cart={cart}
                />
            ))}
        </div>
    )
}
