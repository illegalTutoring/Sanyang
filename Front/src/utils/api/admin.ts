import axios, { Axios, AxiosResponse } from 'axios'

const SERVER_URL = process.env.SERVER_URL

// TODO: redux에서 값을 가져오도록 수정할 것.
let token: string = 'TEST_TOKEN_IT_MUST_BE_CHANGED'

export async function getOutsourcingDetail(outsourcing_id: string) {
    /**
     * 외주 상세 정보를 반환한다.
     *
     * @param outsourcing_id - 조회하고자 하는 외주의 id
     * @returns outsourcingDetailResponseGetDto 객체
     *
     * @beta
     */

    // const response: AxiosResponse<JSON> = await axios({
    //     method: 'GET',
    //     url: `${SERVER_URL}/admin/outsourcing/detail/${outsourcing_id}`,
    //     headers: {
    //         Authorization: token,
    //     },
    // })
    // return response.data

    // START - DUMMY DATA
    return {
        message: '외주 상세페이지 조회 완료',
        outsourcingInfo: [
            {
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 캐릭터 일러스트 작업',
                content: '작업 내용 (Contents)',
                image: [
                    {
                        s3Path: '/s3/...',
                    },
                    {
                        s3Path: '/s3/...',
                    },
                ],
            },
        ],
    }
    // END - DUMMY DATA
}

// TODO: 외주 등록, 외주 수정, 외주 삭제
// TODO: 갤러리 등록, 갤러리 수정, 갤러리 삭제

// TODO: Dummy Data 추가
export async function modifyBanner(image: File) {
    /**
     * 배너 이미지 변경
     *
     * @param image - 변경하고자 하는 새로운 이미지
     * @returns 서버 응답 메시지
     *
     * @beta
     */

    const formData = new FormData()
    formData.append('image', image, 'banner')
    const response: AxiosResponse<JSON> = await axios({
        method: 'PUT',
        url: `${SERVER_URL}/admin/banner`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
        },
    })

    return response.data
}

// TODO: 임베드 링크 변경

// TODO: Dummy Data 추가
export async function insertNotice(
    title: string,
    content: string,
    type: number,
) {
    /**
     * 공지 사항 추가
     *
     * @param title - 공지 사항 제목
     * @param content - 공지 사항 내용
     * @param type - 공지 분류 번호 (0: 공지사항, 1: 업데이트)
     * @returns 서버 응답 메시지
     *
     * @beta
     */

    const response: AxiosResponse<JSON> = await axios({
        method: 'POST',
        url: `${SERVER_URL}/admin/notice`,
        data: {
            title,
            content,
            type,
        },
        headers: {
            Authorization: token,
        },
    })
    return response.data
}

// TODO: Dummy Data 추가
export async function modifyNotice(
    notice_id: number,
    title: string,
    content: string,
    type: number,
) {
    /**
     * 공지 사항 수정
     *
     * @param notice_id - 공지 사항 id
     * @param title - 공지 사항 제목
     * @param content - 공지 사항 내용
     * @param type - 공지 분류 번호 (0: 공지사항, 1: 업데이트)
     * @returns 서버 응답 메시지
     *
     * @beta
     */

    const response: AxiosResponse<JSON> = await axios({
        method: 'PUT',
        url: `${SERVER_URL}/admin/notice/${notice_id}`,
        data: {
            id: notice_id,
            title,
            content,
            type,
        },
        headers: {
            Authorization: token,
        },
    })
    return response.data
}

export async function deleteNotice(notice_id: number) {
    /**
     * 공지 사항 삭제
     *
     * @param notice_id - 공지 사항 id
     * @returns 서버 응답 메시지
     *
     * @beta
     */

    const response: AxiosResponse<JSON> = await axios({
        method: 'DELETE',
        url: `${SERVER_URL}/admin/notice/${notice_id}`,
        headers: {
            Authorization: token,
        },
    })
    return response.data
}
