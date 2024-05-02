import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import {
    loginRequestDTO,
    loginResponseDTO,
    reIssueResponseDTO,
    signinRequestDTO,
    signinResponseDTO,
} from './DTO/user'
import { userStore } from '../store/useUserStore'

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

            userStore.getState().setId(data.username)
            userStore.getState().setAccessToken(response.headers.accesstoken)
            console.info(
                'Login >> Access Token: ' + userStore.getState().accessToken,
                'Login >> User ID: ' + userStore.getState().id,
            )

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
                Authorization: userStore.getState().accessToken,
            },
        })

        userStore.getState().destroyAll()

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

        userStore.getState().setAccessToken(response.headers.accesstoken)
        console.info(
            'ReIssue >> AccessToken: ' + userStore.getState().accessToken,
        )

        return { message: response.data.message }
    }, [])
}
