import { createStore } from 'zustand'

interface userState {
    id: string
    username: string
    accessToken: string

    setId: (by: string) => void
    setUsername: (by: string) => void
    setAccessToken: (by: string) => void
    destroyAccessToken: () => void
    destroyAll: () => void
}

export const userStore = createStore<userState>()((set) => ({
    id: '',
    username: '',
    accessToken: '',

    setId: (by) => set({ id: by }),
    setUsername: (by) => set({ username: by }),
    setAccessToken: (by) => set({ accessToken: by }),
    destroyAccessToken: () => set({ accessToken: '' }),
    destroyAll: () =>
        set({
            id: '',
            username: '',
            accessToken: '',
        }),
}))
