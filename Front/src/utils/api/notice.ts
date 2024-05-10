import axios, { AxiosResponse } from 'axios'
import {
    getNoticeDetailResponseDTO,
    getNoticeListResponseDTO,
    getRecentNoticeResponseDTO,
    getTotalNoticeResponseDTO,
} from './DTO/notice'
import { axiosRequestHandler } from './interceptor'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export function getNoticeList(
    page: number,
    size: number,
): getNoticeListResponseDTO {
    /**
     * 공지 사항 목록을 반환한다.
     *
     * @beta
     */

    return axiosRequestHandler(
        async (page: number, size: number) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `${SERVER_URL}/notice?page=${page}&size=${size}`,
            })

            return {
                message: response.data.message,
                data: response.data.data,
                page: response.data.page,
            }
        },
        [page, size],
    )
}

export function getRecentNotice(): getRecentNoticeResponseDTO {
    /**
     * 가장 최신 공지 사항의 정보를 반환한다.
     *
     * @beta
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `${SERVER_URL}/notice/top`,
        })

        return {
            data: response.data.data,
        }
    }, [])
}

export function getNoticeDetail(noticeId: number): getNoticeDetailResponseDTO {
    /**
     * 가장 최신 공지 사항의 정보를 반환한다.
     *
     * @beta
     */

    return axiosRequestHandler(
        async (noticeId: number) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `${SERVER_URL}/notice/detail/${noticeId}`,
            })

            return {
                data: response.data.data,
            }
        },
        [noticeId],
    )
}

export function getTotalNotice(): getTotalNoticeResponseDTO {
    /**
     * 공지 사항의 전체 페이지 수를 반환한다.
     *
     * @beta
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `${SERVER_URL}/notice/total`,
        })

        return {
            message: response.data.message,
            data: response.data.data,
        }
    }, [])
}
