import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EditModeState {
    isEditMode: boolean
    toggleEditMode: () => void
}

const useEditModeStore = create(
    persist<EditModeState>(
        (set, get) => ({
            isEditMode: false,
            toggleEditMode: () =>
                set((state) => ({ isEditMode: !state.isEditMode })),
        }),
        {
            name: 'EditModeStorage',
        },
    ),
)

export default useEditModeStore
