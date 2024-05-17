import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import {
    loginRequestDTO,
    loginResponseDTO,
    reIssueResponseDTO,
    signinRequestDTO,
    signinResponseDTO,
} from './DTO/user'
import userStore from '../store/useUserStore'
import { serverResponseDTO } from './DTO/common'
import useAuthStore from '../store/useAuthStore'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export function login(data: loginRequestDTO): Promise<loginResponseDTO> {
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
            userStore.getState().setUsername(response.data.username)
            userStore.getState().setAccessToken(response.headers.authorization)
            userStore.getState().setRole(response.data.role)

            return {
                statusCode: response.status,
                message: response.data.message,
            }
        },
        [data],
    )
}

export function logout(): Promise<serverResponseDTO> {
    /**
     * 로그아웃
     *
     * @beta
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'POST',
            url: `${SERVER_URL}/user/logout`,
        })

        useAuthStore.getState().logOut()

        return {
            statusCode: response.status,
            message: response.data.message,
        }
    }, [])
}

export function signin(data: signinRequestDTO): Promise<signinResponseDTO> {
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

            return {
                statusCode: response.status,
                message: response.data.message,
            }
        },
        [data],
    )
}

export function reIssue(): Promise<reIssueResponseDTO> {
    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'POST',
            url: `${SERVER_URL}/user/reissue`,
        })

        userStore.getState().setAccessToken(response.headers.authorization)

        return {
            statusCode: response.status,
            message: response.data.message,
        }
    }, [])
}
