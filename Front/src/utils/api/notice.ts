import axios, { AxiosResponse } from 'axios'

export async function getNoticeList() {
    /**
     * 공지 사항 목록을 반환한다.
     *
     * @returns NoticeTitleListResponseDto 객체의 Array가 담긴 JSON
     *
     * @beta
     */

    const response: AxiosResponse<JSON> = await axios({
        method: 'GET',
        url: `${process.env.SERVER_URL}/notice`,
    })
    return response.data
}

export async function getNoticeDetail(notice_id: number) {
    /**
     * 선택된 공지 사항의 상세정보를 반환한다.
     *
     * @returns NoticeDto가 담긴 JSON
     *
     * @beta
     */

    const response: AxiosResponse<JSON> = await axios({
        method: 'GET',
        url: `${process.env.SERVER_URL}/notice/${notice_id}`,
    })
    return response.data
}
