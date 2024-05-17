import { serverResponseDTO } from './common'

export interface embedInfo {
    type: number
    link: string
}

export interface embedLinkInfo {
    embedId: number
    type: number
    link: string
}

export interface getEmbedLinkResponseDTO extends serverResponseDTO {
    data: Array<embedLinkInfo>
}

export interface modifyEmbedLinkRequestDTO {
    data: Array<embedInfo>
}

export interface modifyEmbedLinkResponseDTO extends serverResponseDTO {}
