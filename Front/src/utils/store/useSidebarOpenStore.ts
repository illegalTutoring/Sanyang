import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarOpenState {
    isSidebarOpen: boolean
    setSidebarOpen: (isSidebarOpen: boolean) => void
    toggleSidebarOpen: () => void
}

const useSidebrarOpenStore = create(
    persist<SidebarOpenState>(
        (set, get) => ({
            isSidebarOpen: false,
            setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
            toggleSidebarOpen: () =>
                set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        }),
        {
            name: 'SidebarOpenStorage',
        },
    ),
)

export default useSidebrarOpenStore
