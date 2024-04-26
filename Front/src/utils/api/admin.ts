import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'

const SERVER_URL = process.env.SERVER_URL

// TODO: redux에서 값을 가져오도록 수정할 것.
let accessToken: string = 'TEST_ACCESS_TOKEN_IT_MUST_BE_CHANGED'

interface serverResponseDTO {
    message: String
}

// #########################################################
// Start - Work API

interface registWorkRequestDTO {
    userId: String
    company: String
    title: String
    startDate: String
    endDate: String
    tags: Array<String>
}
interface reigstWorkResponseDTO extends serverResponseDTO {}

export function registWork(
    data: registWorkRequestDTO,
    image: File,
): reigstWorkResponseDTO {
    /**
     * 외주 등록
     *
     * @param data - 외주 정보
     * @param image - 이미지
     * @returns 서버 응답 메시지
     *
     * @beta
     * @todo
     * 테스트
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
                    Authorization: accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data, image],
    )
}

interface modifyWorkRequestDTO {
    company: String
    title: String
    startDate: String
    endDate: String
    tags: Array<String>
}
interface modifyWorkResponseDTO extends serverResponseDTO {}

export function modifyWork(
    data: modifyWorkRequestDTO,
    image: File | null,
): modifyWorkResponseDTO {
    /**
     * 외주 수정
     *
     * @param data - 외주 정보
     * @param image - 이미지 (수정되지 않으면 null)
     * @returns 서버 응답 메시지
     *
     * @beta
     * @todo
     * 테스트
     *
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
                    Authorization: accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data, image],
    )
}

interface deleteWorkResponseDTO extends serverResponseDTO {}

export function deleteWork(workId: number): deleteWorkResponseDTO {
    /**
     * 외주 삭제
     *
     * @param workId - 외주 id
     * @returns 서버 응답 메시지
     *
     * @beta
     * @todo
     * 테스트
     *
     */

    return axiosRequestHandler(
        async (workId) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'DELETE',
                url: `${SERVER_URL}/admin/work/${workId}`,
                headers: {
                    Authorization: accessToken,
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
interface registGalleryRequestDTO {
    title: String
    content: String
    createDate: String
    tags: Array<String>
}
interface registGalleryResponseDTO extends serverResponseDTO {}

export function registGallery(
    data: registGalleryRequestDTO,
    image: File,
): registGalleryResponseDTO {
    /**
     * 갤러리 등록
     *
     * @param data - 갤러리 정보
     * @param image - 이미지
     * @returns 서버 응답 메시지
     *
     * @beta
     * @todo
     * 테스트
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
                url: `${SERVER_URL}/admin/gallery`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data, image],
    )
}

interface modifyGalleryRequestDTO {
    galleryId: number
    title: String
    content: String
    createDate: String
    tags: Array<String>
}
interface modifyGalleryResponseDTO extends serverResponseDTO {}

export function modifyGallery(
    data: modifyGalleryRequestDTO,
    image: File | null,
): modifyGalleryResponseDTO {
    /**
     * 갤러리 수정
     *
     * @param data - 갤러리 정보
     * @param image - 이미지 (수정되지 않으면 null)
     * @returns 서버 응답 메시지
     *
     * @beta
     * @todo
     * 테스트
     *
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
                    Authorization: accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data, image],
    )
}

interface deleteGalleryResponseDTO extends serverResponseDTO {}

export function deleteGallery(galleryId: number): deleteGalleryResponseDTO {
    /**
     * 갤러리 삭제
     *
     * @param galleryId - 갤러리 id
     * @returns 서버 응답 메시지
     *
     * @beta
     * @todo
     * 테스트
     *
     */

    return axiosRequestHandler(
        async (galleryId) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'DELETE',
                url: `${SERVER_URL}/admin/gallery/${galleryId}`,
                headers: {
                    Authorization: accessToken,
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
interface registCalendarRequestDTO {
    userId: String
    title: String
    startDate: String
    endDate: String
}
interface registCalendarResponseDTO extends serverResponseDTO {}

export function registCalendar(
    data: registCalendarRequestDTO,
): registCalendarResponseDTO {
    /**
     * 일정 등록
     *
     * @param data - 일정 정보
     * @returns 서버 응답 메시지
     *
     */

    return axiosRequestHandler(
        async (data) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: `${SERVER_URL}/admin/calendar`,
                data: data,
                headers: {
                    Authorization: accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data],
    )
}

interface modifyCalendarRequestDTO {
    calendarId: number
    userId: String
    title: String
    startDate: String
    endDate: String
}
interface modifyCalendarResponseDTO extends serverResponseDTO {}

export function modifyCalendar(
    data: modifyCalendarRequestDTO,
): modifyCalendarResponseDTO {
    /**
     * 일정 수정
     *
     * @param data - 일정 정보
     * @returns 서버 응답 메시지
     *
     */

    return axiosRequestHandler(
        async (data) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'PUT',
                url: `${SERVER_URL}/admin/calendar/${data.calendarId}`,
                data: data,
                headers: {
                    Authorization: accessToken,
                },
            })
            return { message: response.data.message }
        },
        [data],
    )
}

interface deleteCalendarResponseDTO extends serverResponseDTO {}

export function deleteCalendar(calendarId: number): deleteCalendarResponseDTO {
    /**
     * 일정 수정
     *
     * @param calendarId - 일정 id
     * @returns 서버 응답 메시지
     *
     */

    return axiosRequestHandler(
        async (calendarId) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'DELETE',
                url: `${SERVER_URL}/admin/calendar/${calendarId}`,
                headers: {
                    Authorization: accessToken,
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

interface imageInfo {
    x: number
    y: number
}
interface modifyBannerListRequestDTO {
    // 주의!
    // images와 해당 이미지의 정보를 담은 infos의 index가 정확하게 매치 되어야한다.
    images: Array<File>
    infos: Array<imageInfo>
}
interface modifyBannerListResponseDTO {}

export function modifyBannerList(
    data: modifyBannerListRequestDTO,
): modifyBannerListResponseDTO {
    /**
     * 배너 수정
     *
     * @param data - 배너 이미지 및 이미지의 정보
     * @returns 서버 응답 메시지
     *
     */

    return axiosRequestHandler(async (data: modifyBannerListRequestDTO) => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'PUT',
            url: `${SERVER_URL}/admin/banner`,
            data: data,
            headers: {
                Authorization: accessToken,
            },
        })
        return { message: response.data.message }
    }, [])
}

// End - Banner API
// #########################################################
