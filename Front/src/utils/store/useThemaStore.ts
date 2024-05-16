import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type DarkModeState = {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

const useDarkModeStore = create(
    persist<DarkModeState>(
        (set, get) => ({
            isDarkMode: false,
            toggleDarkMode: () =>
                set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        {
            name: 'DarkModeStorage',
        },
    ),
)

export default useDarkModeStore
