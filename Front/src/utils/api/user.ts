import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import {
    loginRequestDTO,
    loginResponseDTO,
    signinRequestDTO,
    signinResponseDTO,
} from './DTO/user'

// TODO: redux에서 값을 가져오도록 수정할 것.
let accessToken: string = 'TEST_ACCESS_TOKEN_IT_MUST_BE_CHANGED'

export function login(data: loginRequestDTO): loginResponseDTO {
    /**
     * 로그인
     *
     * @beta
     */

    return axiosRequestHandler(
        async (data: loginRequestDTO) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: `${process.env.SERVER_URL}/user/login`,
                data: data,
            })

            // TODO: AccessToken, Refresh Token 전역 관리 코드 추가

            return {
                message: response.data.message,
                accessToken: response.data.accessToken,
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
            url: `${process.env.SERVER_URL}/user/logout`,
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
                url: `${process.env.SERVER_URL}/user/signin`,
                data: data,
            })

            return { message: response.data.message }
        },
        [data],
    )
}
