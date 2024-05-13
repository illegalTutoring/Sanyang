import { serverResponseDTO } from './common'

interface imageInfo {
    coordinateX: number
    coordinateY: number
}

export interface bannerInfo {
    bannerId: number
    imagePath: string
    coordinateX: number
    coordinateY: number
}

export interface getBannerResponseDTO extends serverResponseDTO {
    // 배너 정보가 존재하지 않아도 빈 객체를 담아야한다.
    data: Array<bannerInfo>
}

export interface modifyBannerListRequestDTO {
    // 주의!
    // images와 해당 이미지의 정보를 담은 infos의 index가 정확하게 매치 되어야한다.
    // 이미지 혹은 정보가 존재하지 않아도 빈 객체를 담아야한다.
    images: Array<File>
    infos: Array<imageInfo>
}

export interface modifyBannerListResponseDTO extends serverResponseDTO {}
