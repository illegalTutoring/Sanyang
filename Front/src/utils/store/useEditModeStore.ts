import { create } from 'zustand'

interface EditModeState {
    isEditMode: boolean
    toggleEditMode: () => void
}

const useEditModeStore = create<EditModeState>((set) => ({
    isEditMode: false,
    toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
}))

export default useEditModeStore
