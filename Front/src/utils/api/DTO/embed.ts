import { serverResponseDTO } from './common'

interface embedInfo {
    type: number
    link: String
}

interface embedLinkInfo {
    embedId: number
    type: number
    link: String
}

export interface getEmbedLinkResponseDTO extends serverResponseDTO {
    data: Array<embedLinkInfo>
}

export interface modifyEmbedLinkRequestDTO {
    data: Array<embedInfo>
}

export interface modifyEmbedLinkResponseDTO extends serverResponseDTO {}
