import { serverResponseDTO } from './common'

interface supportLink {
    name: string
    link: string
}

export interface supportDetailInfo {
    supportId: number
    thumbnail: string
    title: string
    uploadDate: string
    supportLink: Array<supportLink>
    content: string
}

export interface registSupportRequestDTO {
    title: string
    uploadDate: string
    supportLink: Array<supportLink>
    content: string
}

export interface modifySupportRequestDTO {
    supportId: number
    title: string
    supportLink: Array<supportLink>
    content: string
}

export interface getSupportListResponseDTO extends serverResponseDTO {
    data: Array<supportDetailInfo>
}

export interface registSupportResponseDTO extends serverResponseDTO {}
export interface modifySupportResponseDTO extends serverResponseDTO {}
export interface deleteSupportResponseDTO extends serverResponseDTO {}
