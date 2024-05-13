import { serverResponseDTO } from './common'

export interface galleryInfo {
    galleryId: number
    userId: string
    title: string
    startDate: string
    endDate: string
    uploadDate: string
    tags: Array<string>
    original: string
    thumbnail: string
}

export interface getGalleryListResponseDTO extends serverResponseDTO {
    data: Array<galleryInfo>
}

export interface registGalleryRequestDTO {
    title: string
    createDate: string
    tags: Array<string>
}

export interface modifyGalleryRequestDTO {
    galleryId: number
    title: string
    createDate: string
    tags: Array<string>
}

export interface registGalleryResponseDTO extends serverResponseDTO {}
export interface modifyGalleryResponseDTO extends serverResponseDTO {}
export interface deleteGalleryResponseDTO extends serverResponseDTO {}
