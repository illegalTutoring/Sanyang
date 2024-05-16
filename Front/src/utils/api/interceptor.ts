import axios, { AxiosResponse } from 'axios'
import userStore from '../store/useUserStore'
import { logout, reIssue } from './user'

type RequestFunction = (...params: any[]) => any

export async function axiosRequestHandler(
    request: RequestFunction,
    params: any[],
): Promise<any> {
    try {
        return await request(...params)
    } catch (error: any) {
        const statusCode = error.response?.statusCode
        const statusText = error.response?.statusText
        const message = error.response?.data?.messagee

        console.error('Custom Error: ', message)

        if (axios.isAxiosError(error)) {
            console.error('네트워크 혹은 서버 연결에 문제가 발생했습니다.')
        }

        if (statusCode === 401 && message === '만료된 access 토큰입니다') {
            if (userStore.getState().accessToken === '') {
                /**
                 * @beta
                 * @todo 로그아웃 화면 전환
                 */
                console.log(111111)
                return await logout()
            } else {
                /**
                 * @beta
                 * @todo
                 * Access Token 파기
                 * reIssue
                 * 기존 API 재요청
                 */
                console.log(222222)
                let tempAccessToken = userStore.getState().accessToken
                userStore.getState().destroyAccessToken()
                reIssue(tempAccessToken)
                return await request(...params)
            }
        } else if (
            statusCode === 401 &&
            message === '만료된 refresh 토큰입니다'
        ) {
            /**
             * @beta
             * @todo 로그아웃
             */
            console.log(333333)
            return await logout()
        } else if (
            statusCode === 401 &&
            message === 'S3 접근 권한이 없습니다.'
        ) {
            /**
             * @beta
             * @todo S3 접근 권한에 대한 화면 전환
             */
        } else {
            console.log(444444)
            return await logout()
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
