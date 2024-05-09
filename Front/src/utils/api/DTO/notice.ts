import { serverResponseDTO } from './common'

export interface noticeInfo {
    id: number
    title: string
}

export interface noticeDetailInfo {
    id: number
    username: string
    title: string
    content: string
    registDate: string
    views: number
}

export interface registNoticeRequestDTO {
    title: string
    content: string
}

export interface modifyNoticeRequestDTO {
    noticeId: number
    title: string
    content: string
}

export interface getNoticeListResponseDTO extends serverResponseDTO {
    data: Array<noticeInfo>
    page: number
}

export interface getRecentNoticeResponseDTO extends serverResponseDTO {
    data: noticeDetailInfo
}

export interface getNoticeDetailResponseDTO extends serverResponseDTO {
    data: noticeDetailInfo
}

export interface getTotalNoticeResponseDTO extends serverResponseDTO {
    data: number
}

export interface registNoticeResponseDTO extends serverResponseDTO {}
export interface modifyNoticeResponseDTO extends serverResponseDTO {}
export interface deleteNoticeResponseDTO extends serverResponseDTO {}
