import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import { getGalleryListResponseDTO } from './DTO/gallery'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export function getGalleryList(): getGalleryListResponseDTO {
    /**
     * 갤러리 이미지 정보 목록을 반환한다.
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `${SERVER_URL}/gallery`,
        })

        return {
            message: response.data.message,
            data: response.data.data,
        }
    }, [])
}

export function getGalleryListByTag(
    tags: Array<string>,
): getGalleryListResponseDTO {
    /**
     * 검색 태그에 해당하는 갤러리 이미지 정보 목록을 반환한다.
     */

    return axiosRequestHandler(
        async (tags: Array<string>) => {
            let tagString: string = ''
            for (let index = 0; index < tags.length - 1; index++) {
                tagString += tags[index] + ','
            }
            if (tags.length > 0) {
                tagString += tags[tags.length - 1]
            }

            const response: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `${SERVER_URL}/gallery/${tagString}`,
            })

            return {
                message: response.data.message,
                data: response.data.data,
            }
        },
        [tags],
    )
}
