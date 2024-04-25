import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'

const SERVER_URL = process.env.SERVER_URL

// TODO: redux에서 값을 가져오도록 수정할 것.
let accessToken: string = 'TEST_ACCESS_TOKEN_IT_MUST_BE_CHANGED'

interface registWorkDTO {
    userId: String
    company: String
    title: String
    startDate: String
    endDate: String
    tags: Array<String>
}
export function registWork(data: registWorkDTO, image: File) {
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

interface modifyWorkDTO {
    company: String
    title: String
    startDate: String
    endDate: String
    tags: Array<String>
}
export function modifyWork(data: Object, image: File | null) {
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

export function deleteWork(workId: number) {
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

interface registGalleryDTO {
    title: String
    content: String
    createDate: String
    tags: Array<String>
}
export function registGallery(data: registGalleryDTO, image: File) {
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

interface modifyGalleryDTO {
    galleryId: number
    title: String
    content: String
    createDate: String
    tags: Array<String>
}
export function modifyGallery(data: modifyGalleryDTO, image: File | null) {
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

export function deleteGallery(galleryId: number) {
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

interface registCalendarDTO {
    userId: String
    title: String
    startDate: String
    endDate: String
}
export function registCalendar(data: registCalendarDTO) {
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

interface modifyCalendarDTO {
    calendarId: number
    userId: String
    title: String
    startDate: String
    endDate: String
}
export function modifyCalendar(data: modifyCalendarDTO) {
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

export function deleteCalendar(calendarId: number) {
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
