import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'

const SERVER_URL = process.env.SERVER_URL

// TODO: redux에서 값을 가져오도록 수정할 것.
let accessToken: string = 'TEST_ACCESS_TOKEN_IT_MUST_BE_CHANGED'

export function registWork(data: JSON, image: File) {
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

export function modifyWork(data: JSON, image: File | null) {
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

export function registGallery(data: JSON, image: File) {
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

export function modifyGallery(data: JSON, image: File | null) {
    /**
     * 외주 수정
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
