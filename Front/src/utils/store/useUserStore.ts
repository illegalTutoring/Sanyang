import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

// const userStore = createStore<userState>()((set) => ({

//     id: '',
//     username: '',
//     accessToken: '',
//     role: 'USER',

//     setId: (by) => set({ id: by }),
//     setUsername: (by) => set({ username: by }),
//     setAccessToken: (by) => set({ accessToken: by }),
//     setRole: (by) => set({ role: by }),
//     destroyAccessToken: () => set({ accessToken: '' }),
//     destroyAll: () =>
//         set({
//             id: '',
//             username: '',
//             accessToken: '',
//             role: '',
//         }),
// }))

const useEditModeStore = create(
    persist<userState>(
        (set, get) => ({
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
        }),
        {
            name: 'UserStorage',
        },
    ),
)

export default useEditModeStore
