import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import { getWorkListResponseDTO } from './DTO/work'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export function getWorkList(): getWorkListResponseDTO {
    /**
     * 외주 이미지 정보 목록을 반환한다.
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `${SERVER_URL}/work`,
        })

        console.log(response.data.data)

        return {
            message: response.data.message,
            data: response.data.data,
        }
    }, [])
}
