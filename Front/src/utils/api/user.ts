import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import {
    loginRequestDTO,
    loginResponseDTO,
    reIssueResponseDTO,
    signinRequestDTO,
    signinResponseDTO,
} from './DTO/user'

// TODO: redux에서 값을 가져오도록 수정할 것.
let accessToken: string = 'TEST_ACCESS_TOKEN_IT_MUST_BE_CHANGED'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export function login(data: loginRequestDTO): loginResponseDTO {
    /**
     * 로그인
     *
     * @beta
     */

    return axiosRequestHandler(
        async (data: loginRequestDTO) => {
            let formData = new FormData()
            formData.append('username', data.username)
            formData.append('password', data.password)
            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: `${SERVER_URL}/user/login`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            // TODO: AccessToken, Refresh Token 전역 관리 코드 추가
            // console.log('Access Token: ', response.headers.accesstoken)

            return {
                message: response.data.message,
                accessToken: response.headers.accesstoken,
            }
        },
        [data],
    )
}

export function logout() {
    /**
     * 로그아웃
     *
     * @beta
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `${SERVER_URL}/user/logout`,
            headers: {
                Authorization: accessToken,
            },
        })

        // TODO: AccessToken, Refresh Token 전역 관리 코드 추가

        return { message: response.data.message }
    }, [])
}

export function signin(data: signinRequestDTO): signinResponseDTO {
    /**
     * 회원 가입
     *
     * @beta
     */

    return axiosRequestHandler(
        async (data: signinRequestDTO) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: `${SERVER_URL}/user/signin`,
                data: data,
            })

            return { message: response.data.message }
        },
        [data],
    )
}

export function reIssue(accessToken: string): reIssueResponseDTO {
    return axiosRequestHandler(async () => {
        console.log('reIssue AccessToken: ', accessToken)
        const response: AxiosResponse<any, any> = await axios({
            method: 'POST',
            url: `${SERVER_URL}/user/reissue`,
            headers: {
                accessToken,
            },
        })

        return { message: response.data.message }
    }, [])
}
