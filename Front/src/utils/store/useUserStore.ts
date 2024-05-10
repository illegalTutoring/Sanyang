import { createStore } from 'zustand'

interface userState {
    id: string
    username: string
    accessToken: string
    role: string

    setId: (by: string) => void
    setUsername: (by: string) => void
    setAccessToken: (by: string) => void
    setRole: (by: string) => void
    destroyAccessToken: () => void
    destroyAll: () => void
}

export const userStore = createStore<userState>()((set) => ({
    id: '',
    username: '',
    accessToken: '',
    role: 'USER',

    setId: (by) => set({ id: by }),
    setUsername: (by) => set({ username: by }),
    setAccessToken: (by) => set({ accessToken: by }),
    setRole: (by) => set({ role: by }),
    destroyAccessToken: () => set({ accessToken: '' }),
    destroyAll: () =>
        set({
            id: '',
            username: '',
            accessToken: '',
            role: '',
        }),
}))
