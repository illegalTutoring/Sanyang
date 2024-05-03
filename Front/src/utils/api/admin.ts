import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import {
    deleteWorkResponseDTO,
    modifyWorkRequestDTO,
    modifyWorkResponseDTO,
    registWorkRequestDTO,
    reigstWorkResponseDTO,
} from './DTO/work'
import {
    deleteGalleryResponseDTO,
    modifyGalleryRequestDTO,
    modifyGalleryResponseDTO,
    registGalleryRequestDTO,
    registGalleryResponseDTO,
} from './DTO/gallery'
import {
    deleteCalendarResponseDTO,
    modifyCalendarRequestDTO,
    modifyCalendarResponseDTO,
    registCalendarRequestDTO,
    registCalendarResponseDTO,
} from './DTO/calendar'
import {
    modifyBannerListRequestDTO,
    modifyBannerListResponseDTO,
} from './DTO/banner'
import {
    modifyEmbedLinkRequestDTO,
    modifyEmbedLinkResponseDTO,
} from './DTO/embed'
import { userStore } from '../store/useUserStore'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

// #########################################################
// Start - Work API

export function registWork(
    data: registWorkRequestDTO,
    image: File,
): reigstWorkResponseDTO {
    /**
     * 외주 등록
     *
     * @param data - 외주 정보
     * @param image - 이미지
     *
     */

    return axiosRequestHandler(
        async (data, image) => {
            const blobData = new Blob([JSON.stringify(data)], {
                type: 'application/json',
            })
            const formData = new FormData()
            formData.append('data', blobData)
            formData.append('image', image)

            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: `${SERVER_URL}/admin/work`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data, image],
    )
}

export function modifyWork(
    data: modifyWorkRequestDTO,
    image: File | null,
): modifyWorkResponseDTO {
    /**
     * 외주 수정
     *
     * @param data - 외주 정보
     * @param image - 이미지 (수정되지 않으면 null)
     */

    return axiosRequestHandler(
        async (data, image) => {
            const blobData = new Blob([JSON.stringify(data)], {
                type: 'application/json',
            })
            const formData = new FormData()
            formData.append('data', blobData)

            if (image) formData.append('image', image)

            const response: AxiosResponse<any, any> = await axios({
                method: 'PUT',
                url: `${SERVER_URL}/admin/work/${data.workId}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data, image],
    )
}

export function deleteWork(workId: number): deleteWorkResponseDTO {
    /**
     * 외주 삭제
     *
     * @param workId - 외주 id
     */

    return axiosRequestHandler(
        async (workId) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'DELETE',
                url: `${SERVER_URL}/admin/work/${workId}`,
                headers: {
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [workId],
    )
}

// End - Work API
// #########################################################

// #########################################################
// Start - Gallery API

export function registGallery(
    data: registGalleryRequestDTO,
    image: File,
): registGalleryResponseDTO {
    /**
     * 갤러리 등록
     *
     * @param data - 갤러리 정보
     * @param image - 이미지
     */

    return axiosRequestHandler(
        async (data, image) => {
            const blobData = new Blob([JSON.stringify(data)], {
                type: 'application/json',
            })
            const formData = new FormData()
            formData.append('data', blobData)
            formData.append('image', image)

            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: `${SERVER_URL}/admin/gallery`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data, image],
    )
}

export function modifyGallery(
    data: modifyGalleryRequestDTO,
    image: File | null,
): modifyGalleryResponseDTO {
    /**
     * 갤러리 수정
     *
     * @param data - 갤러리 정보
     * @param image - 이미지 (수정되지 않으면 null)
     */

    return axiosRequestHandler(
        async (data, image) => {
            const blobData = new Blob([JSON.stringify(data)], {
                type: 'application/json',
            })
            const formData = new FormData()
            formData.append('data', blobData)

            if (image) formData.append('image', image)

            const response: AxiosResponse<any, any> = await axios({
                method: 'PUT',
                url: `${SERVER_URL}/admin/gallery/${data.galleryId}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data, image],
    )
}

export function deleteGallery(galleryId: number): deleteGalleryResponseDTO {
    /**
     * 갤러리 삭제
     *
     * @param galleryId - 갤러리 id
     */

    return axiosRequestHandler(
        async (galleryId) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'DELETE',
                url: `${SERVER_URL}/admin/gallery/${galleryId}`,
                headers: {
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [galleryId],
    )
}

// End - Gallery API
// #########################################################

// #########################################################
// Start - Calendar API

export function registCalendar(
    data: registCalendarRequestDTO,
): registCalendarResponseDTO {
    /**
     * 일정 등록
     *
     * @param data - 일정 정보
     */

    return axiosRequestHandler(
        async (data) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: `${SERVER_URL}/admin/calendar`,
                data: data,
                headers: {
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data],
    )
}

export function modifyCalendar(
    data: modifyCalendarRequestDTO,
): modifyCalendarResponseDTO {
    /**
     * 일정 수정
     *
     * @param data - 일정 정보
     */

    return axiosRequestHandler(
        async (data) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'PUT',
                url: `${SERVER_URL}/admin/calendar/${data.calendarId}`,
                data: data,
                headers: {
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data],
    )
}

export function deleteCalendar(calendarId: number): deleteCalendarResponseDTO {
    /**
     * 일정 수정
     *
     * @param calendarId - 일정 id
     */

    return axiosRequestHandler(
        async (calendarId) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'DELETE',
                url: `${SERVER_URL}/admin/calendar/${calendarId}`,
                headers: {
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [calendarId],
    )
}

// End - Calendar API
// #########################################################

// #########################################################
// Start - Banner API

export function modifyBannerList(
    data: modifyBannerListRequestDTO,
): modifyBannerListResponseDTO {
    /**
     * 배너 수정
     *
     * @param data - 배너 이미지 및 이미지의 정보
     */

    return axiosRequestHandler(
        async (data: modifyBannerListRequestDTO) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'PUT',
                url: `${SERVER_URL}/admin/banner`,
                data: data,
                headers: {
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data],
    )
}

// End - Banner API
// #########################################################

// #########################################################
// Start - Embed API

export function modifyEmbedLink(
    data: modifyEmbedLinkRequestDTO,
): modifyEmbedLinkResponseDTO {
    /**
     * 임베드 링크 수정
     *
     * @param data - 임베드 링크 목록 정보
     */

    return axiosRequestHandler(
        async (data: modifyEmbedLinkRequestDTO) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'PUT',
                url: `${SERVER_URL}/admin/embed`,
                data: data,
                headers: {
                    Authorization: userStore.getState().accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data],
    )
}

// End - Embed API
// #########################################################
