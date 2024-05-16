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

        console.error('Custom Error: ', error)
        if (
            statusCode === 401 &&
            message === '만료된 access 토큰입니다' &&
            userStore.getState().accessToken !== ''
        ) {
            let tempAccessToken = userStore.getState().accessToken
            userStore.getState().destroyAccessToken()
            reIssue(tempAccessToken)
            return await request(...params)
        } else {
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
