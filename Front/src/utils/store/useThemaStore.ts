import { create } from 'zustand'

type DarkModeState = {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

const useDarkModeStore = create<DarkModeState>((set) => ({
    isDarkMode: false,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}))

export default useDarkModeStore
