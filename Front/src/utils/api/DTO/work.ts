import { serverResponseDTO } from './common'

interface workInfo {
    workId: number
    userId: String
    title: String
    company: String
    startDate: String
    endDate: String
    uploadDate: String
    tags: Array<String>
    original: String
    thumbnail: String
    watermark: String
}

export interface getWorkListResponseDTO {
    data: Array<workInfo>
}

export interface registWorkRequestDTO {
    userId: String
    company: String
    title: String
    startDate: String
    endDate: String
    tags: Array<String>
}

export interface modifyWorkRequestDTO {
    company: String
    title: String
    startDate: String
    endDate: String
    tags: Array<String>
}

export interface reigstWorkResponseDTO extends serverResponseDTO {}
export interface modifyWorkResponseDTO extends serverResponseDTO {}
export interface deleteWorkResponseDTO extends serverResponseDTO {}
