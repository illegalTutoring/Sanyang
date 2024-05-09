import { create } from 'zustand'

interface AuthState {
    isLoggedIn: boolean
    logIn: () => void
    logOut: () => void
}

const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    logIn: () => set({ isLoggedIn: true }),
    logOut: () => set({ isLoggedIn: false }),
}))

export default useAuthStore
