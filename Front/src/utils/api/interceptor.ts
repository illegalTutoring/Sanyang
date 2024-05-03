import axios, { AxiosResponse } from 'axios'

type RequestFunction = (...params: any[]) => any

export function axiosRequestHandler(request: RequestFunction, params: any[]) {
    try {
        return request(...params)
    } catch (error: any) {
        const statusCode = error.response.statusCode
        const statusText = error.response.statusText
        const message = error.response.data.message

        if (axios.isAxiosError(error)) {
            console.error('네트워크 혹은 서버 연결에 문제가 발생했습니다.')
        }

        /**
         * @todo 404 Not Found 에러 공통 처리
         * @todo 500 에러 공통 처리
         */

        return {
            statusCode: statusCode,
            statusText: statusText,
            message: message,
        }
    }
}
