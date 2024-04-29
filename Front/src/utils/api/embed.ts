import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import { getEmbedLinkResponseDTO } from './DTO/embed'

export function getEmbedLink(): getEmbedLinkResponseDTO {
    /**
     * 임베드 링크 목록 정보를 반환한다.
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `${process.env.SERVER_URL}/embed`,
        })
        return {
            message: response.data.message,
            data: response.data.data,
        }
    }, [])
}
