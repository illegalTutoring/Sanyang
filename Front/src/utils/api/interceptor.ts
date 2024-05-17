import useAuthStore from '../store/useAuthStore'
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
        const statusCode = error.response?.status
        const statusText = error.response?.statusText
        const message = error.response?.data?.message

        console.error('Custom Error: ', statusCode, statusText, message)
        if (
            statusCode === 401 &&
            message === '만료된 access 토큰입니다' &&
            userStore.getState().accessToken !== ''
        ) {
            userStore.getState().destroyAccessToken()
            reIssue()
            return await request(...params)
        } else if (
            statusCode === 401 &&
            (message === '잘못된 refresh 토큰 입니다' ||
                message === '잘못된 access 토큰 입니다')
        ) {
            userStore.getState().destroyAll()
            useAuthStore.getState().logOut()
            return {
                statusCode: statusCode,
                statusText: statusText,
                message: message,
            }
        } else {
            userStore.getState().destroyAll()
            // return await logout()
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
