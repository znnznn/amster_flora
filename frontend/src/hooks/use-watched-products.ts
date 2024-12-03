'use client'

import Cookies from 'js-cookie'
import { useEffect } from 'react'

const COOKIE_NAME = 'watchedProducts'
const COOKIE_EXPIRES = 30 // днів

export const useWatchedProducts = (productId: string | number) => {
    useEffect(() => {
        const addToWatched = () => {
            const watched = Cookies.get(COOKIE_NAME)
            let watchedProducts: string[] = watched ? JSON.parse(watched) : []

            if (!watchedProducts.includes(String(productId))) {
                watchedProducts.push(String(productId))
                Cookies.set(COOKIE_NAME, JSON.stringify(watchedProducts), {
                    expires: COOKIE_EXPIRES,
                    sameSite: 'lax'
                })
            }
        }

        addToWatched()
    }, [productId])
}

export const WatchedProductTracker = ({ productId }: { productId: number }) => {
    useWatchedProducts(productId)
    return null
}
