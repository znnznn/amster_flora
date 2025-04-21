import { cookies } from 'next/headers'

import { Advantages } from '../../(home)/components/advantages'

import { FlowerHero } from './components/flower-hero'
import { FlowerInfo } from './components/flower-info'
import { ACCESS_TOKEN } from '@/api/auth/client-auth-storage'
import type { Product } from '@/api/products/products-types'
import { BASE_URL } from '@/config/api'
import type { IdParams } from '@/types/params'

export const generateMetadata = async ({ params }: IdParams) => {
    const { id } = await params

    return {
        title: id
    }
}

const FlowerPage = async ({ params }: IdParams) => {
    const { id } = await params

    const cookiesStore = await cookies()

    const response = await fetch(BASE_URL + `/products/${id}/`, {
        headers: {
            Authorization: `Bearer ${cookiesStore.get(ACCESS_TOKEN)?.value}`
        }
    })

    const flower = (await response.json()) as Product

    return (
        <>
            <FlowerHero flower={flower} />
            <FlowerInfo flower={flower} />
            <Advantages />
        </>
    )
}

export default FlowerPage
