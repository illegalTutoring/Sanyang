import axios, { AxiosResponse } from 'axios'

type RequestFunction = (...params: any[]) => Promise<AxiosResponse>

export async function axiosRequestHandler(
    request: RequestFunction,
    params: any[],
) {
    try {
        return request(...params)
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            // 네트워크 혹은 연결에 문제 발생
            console.error(
                '네트워크 혹은 서버 연결에 문제가 발생했습니다.',
                error.message,
            )
        } else if (error.response) {
            // 서버 응답 코드
            console.error(error.response.data)
        } else {
            // 기타 예외 발생
            console.error(error.message)
        }
        return null
    }
}
