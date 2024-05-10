import { serverResponseDTO } from './common'

export interface workInfo {
    workId?: number
    userId?: string
    title?: string
    company?: string
    startDate?: string
    endDate?: string
    uploadDate?: string
    tags?: Array<string>
    original?: string
    thumbnail?: string
}

export interface getWorkListResponseDTO extends serverResponseDTO {
    data: Array<workInfo>
}

export interface registWorkRequestDTO {
    userId: string
    company: string
    title: string
    startDate: string
    endDate: string
    tags: Array<string>
}

export interface modifyWorkRequestDTO {
    company: string
    title: string
    startDate: string
    endDate: string
    tags: Array<string>
}

export interface reigstWorkResponseDTO extends serverResponseDTO {}
export interface modifyWorkResponseDTO extends serverResponseDTO {}
export interface deleteWorkResponseDTO extends serverResponseDTO {}
