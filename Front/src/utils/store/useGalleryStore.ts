import { createStore } from 'zustand'
import { galleryInfo } from '../api/DTO/gallery'

interface galleryState {
    images: Array<galleryInfo>
    tagList: Array<string>
    imageDivs: HTMLCollectionOf<Element> | undefined

    setImages: (by: Array<galleryInfo>) => void
    setTagList: (by: Array<galleryInfo>) => void
    setImageDivs: (by: HTMLCollectionOf<Element>) => void
}

function makeTagList(images: Array<galleryInfo>): Array<string> {
    const tagSet = new Set<string>()

    images.forEach((image) => {
        image.tags.forEach((tag) => {
            tagSet.add(tag)
        })
    })

    return Array.from(tagSet).sort()
}

export const galleryStore = createStore<galleryState>()((set) => ({
    images: [],
    tagList: [],
    imageDivs: undefined,

    setImages: (by) => set({ images: by }),
    setTagList: (by) => set({ tagList: makeTagList(by) }),
    setImageDivs: (by) => set({ imageDivs: by }),
}))
