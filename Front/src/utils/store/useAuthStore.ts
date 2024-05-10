import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
    isLoggedIn: boolean
    logIn: () => void
    logOut: () => void
}

const useAuthStore = create(
    persist<AuthState>(
        (set, get) => ({
            isLoggedIn: false,
            logIn: () => set({ isLoggedIn: true }),
            logOut: () => set({ isLoggedIn: false }),
        }),
        {
            name: 'AuthStorage',
        },
    ),
)

export default useAuthStore
