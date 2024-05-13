import { createStore } from 'zustand'
import { workInfo } from '../api/DTO/work'

interface workState {
    images: Array<workInfo>
    tagList: Array<string>

    setImages: (by: Array<workInfo>) => void
    setTagList: (by: Array<workInfo>) => void
}

function makeTagList(images: Array<workInfo>): Array<string> {
    const tagSet = new Set<string>()

    images.forEach((image) => {
        image.tags?.forEach((tag) => {
            tagSet.add(tag)
        })
    })

    return Array.from(tagSet).sort()
}

export const workStore = createStore<workState>()((set) => ({
    images: [],
    tagList: [],

    setImages: (by) => set({ images: by }),
    setTagList: (by) => set({ tagList: makeTagList(by) }),
}))
