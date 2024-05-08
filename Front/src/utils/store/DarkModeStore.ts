import { createStore } from 'zustand'

type DarkModeState = {
    isDarkMode: boolean
}

type DarkModeActions = {
    toggleDarkMode: () => void
}

export type DarkModeStore = DarkModeState & DarkModeActions

const defaultInitState: DarkModeState = {
    isDarkMode: false,
}

export const createDarkModeStore = (
    initState: DarkModeState = defaultInitState,
) => {
    return createStore<DarkModeStore>()((set) => ({
        ...initState,
        toggleDarkMode: () =>
            set((state) => ({ isDarkMode: !state.isDarkMode })),
    }))
}
