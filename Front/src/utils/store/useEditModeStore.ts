import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EditModeState {
    isEditMode: boolean
    setEditMode: (isEditMode: boolean) => void
    toggleEditMode: () => void
}

const useEditModeStore = create(
    persist<EditModeState>(
        (set, get) => ({
            isEditMode: false,
            setEditMode: (isEditMode) => set({ isEditMode }),
            toggleEditMode: () =>
                set((state) => ({ isEditMode: !state.isEditMode })),
        }),
        {
            name: 'EditModeStorage',
        },
    ),
)

export default useEditModeStore
