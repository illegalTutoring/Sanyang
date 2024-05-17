import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import { getSupportListResponseDTO } from './DTO/support'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export function getSupportList(): Promise<getSupportListResponseDTO> {
    /**
     * 후원 목록을 반환한다.
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `${SERVER_URL}/support`,
        })

        return {
            message: response.data.message,
            data: response.data.data,
        }
    }, [])
}
