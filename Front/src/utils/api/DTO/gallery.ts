import { serverResponseDTO } from './common'

interface galleryInfo {
    galleryId: number
    userId: String
    title: String
    startDate: String
    endDate: String
    uploadDate: String
    tags: Array<String>
    original: String
    thumbnail: String
    watermark: String
}

export interface getGalleryListResponseDTO extends serverResponseDTO {
    data: Array<galleryInfo>
}

export interface registGalleryRequestDTO {
    title: String
    content: String
    createDate: String
    tags: Array<String>
}

export interface modifyGalleryRequestDTO {
    galleryId: number
    title: String
    content: String
    createDate: String
    tags: Array<String>
}

export interface registGalleryResponseDTO extends serverResponseDTO {}
export interface modifyGalleryResponseDTO extends serverResponseDTO {}
export interface deleteGalleryResponseDTO extends serverResponseDTO {}
