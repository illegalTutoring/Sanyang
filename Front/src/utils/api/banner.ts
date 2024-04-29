import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import { getBannerResponseDTO } from './DTO/banner'

export function getBanner(): getBannerResponseDTO {
    /**
     * 배너 이미지 목록 정보를 반환한다.
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `${process.env.SERVER_URL}/banner`,
        })
        return {
            message: response.data.message,
            data: response.data.data,
        }
    }, [])
}
