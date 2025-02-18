import { getCookie, setCookie } from 'cookies-next/client'
import { useSyncExternalStore } from 'react'

export const useCookie = <T,>(
    key: string,
    initialValue: T,
    options: { maxAge?: number } = {}
) => {
    let serverSnapshotCache: T | undefined

    const subscribe = (callback: () => void) => {
        window.addEventListener('storage', callback)
        return () => window.removeEventListener('storage', callback)
    }

    const getSnapshot = () => {
        try {
            const storedValue = getCookie(key)
            return storedValue ? JSON.parse(storedValue) : initialValue
        } catch (error) {
            console.error('Error reading from cookie:', error)
            return initialValue
        }
    }

    const getServerSnapshot = () => {
        if (serverSnapshotCache !== undefined) {
            return serverSnapshotCache
        }

        serverSnapshotCache = initialValue
        return serverSnapshotCache
    }

    const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

    const setValue = (newValue: T | ((val: T) => T)) => {
        try {
            const valueToStore = newValue instanceof Function ? newValue(value) : newValue

            setCookie(key, JSON.stringify(valueToStore), {
                maxAge: options.maxAge,
                path: '/'
            })

            serverSnapshotCache = undefined

            window.dispatchEvent(new Event('storage'))
        } catch (error) {
            console.error('Error setting cookie:', error)
        }
    }

    return [value, setValue] as const
}
