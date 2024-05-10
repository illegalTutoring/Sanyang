import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useEditModeStore from '@/utils/store/useEditModeStore'

interface AuthState {
    isLoggedIn: boolean
    logIn: () => void
    logOut: () => void
}

const useAuthStore = create(
    persist<AuthState>(
        (set, get) => ({
            isLoggedIn: false,
            logIn: () => {
                set({ isLoggedIn: true })

                const { isEditMode, toggleEditMode } = useEditModeStore()

                if (isEditMode) {
                    toggleEditMode()
                }
            },
            logOut: () => set({ isLoggedIn: false }),
        }),
        {
            name: 'AuthStorage',
        },
    ),
)

export default useAuthStore
