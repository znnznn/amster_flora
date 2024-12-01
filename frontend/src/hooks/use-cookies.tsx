import Cookies from 'js-cookie'
import { useEffect, useSyncExternalStore } from 'react'

type CookieValue = string | undefined

export const useCookie = (key: string, initialValue: string) => {
    const setCookie = (newValue: string) => {
        Cookies.set(key, newValue)
        window.dispatchEvent(new StorageEvent('storage', { key, newValue }))
    }

    const getSnapshot = (): CookieValue => {
        return Cookies.get(key) || initialValue
    }

    const subscribe = (listener: () => void) => {
        window.addEventListener('storage', listener)
        return () => window.removeEventListener('storage', listener)
    }

    const cookieValue = useSyncExternalStore(subscribe, getSnapshot)

    useEffect(() => {
        if (cookieValue === undefined) {
            setCookie(initialValue)
        }
    }, [])

    return [cookieValue, setCookie] as const
}
