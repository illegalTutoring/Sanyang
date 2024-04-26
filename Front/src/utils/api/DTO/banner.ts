import { serverResponseDTO } from './common'

interface imageInfo {
    coordinateX: number
    coordinateY: number
}

interface bannerInfo {
    bannerId: number
    imagePath: String
    coordinateX: number
    coordinateY: number
}

export interface getBannerResponseDTO {
    data: Array<bannerInfo>
}

export interface modifyBannerListRequestDTO {
    // 주의!
    // images와 해당 이미지의 정보를 담은 infos의 index가 정확하게 매치 되어야한다.
    images: Array<File>
    infos: Array<imageInfo>
}

export interface modifyBannerListResponseDTO {}
