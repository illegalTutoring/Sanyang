'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import {
    type DarkModeStore,
    createDarkModeStore,
} from '@/utils/store/DarkModeStore'

export const DarkModeStoreContext =
    createContext<StoreApi<DarkModeStore> | null>(null)

export interface DarkModeStoreProviderProps {
    children: ReactNode
}

export const DarkModeStoreProvider = ({
    children,
}: DarkModeStoreProviderProps) => {
    const storeRef = useRef<StoreApi<DarkModeStore>>()
    if (!storeRef.current) {
        storeRef.current = createDarkModeStore()
    }

    return (
        <DarkModeStoreContext.Provider value={storeRef.current}>
            {children}
        </DarkModeStoreContext.Provider>
    )
}

export const useDarkModeStore = <T,>(
    selector: (store: DarkModeStore) => T,
): T => {
    const darkModeStoreContext = useContext(DarkModeStoreContext)

    if (!darkModeStoreContext) {
        throw new Error(
            `useDarkModeStore must be use within DarkModeStoreProvider`,
        )
    }

    return useStore(darkModeStoreContext, selector)
}
