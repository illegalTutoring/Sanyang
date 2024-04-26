import create from 'zustand'

interface StyleState {
    backgroundColor: string
    setBackgroundColor: (color: string) => void
}

const useStyleStore = create<StyleState>((set) => ({
    backgroundColor: 'white',
    setBackgroundColor: (color) => set({ backgroundColor: color }),
}))

export default useStyleStore
