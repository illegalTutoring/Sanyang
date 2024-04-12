import axios, { AxiosResponse } from 'axios'

const SERVER_URL = process.env.SERVER_URL

// TODO: redux에서 값을 가져오도록 수정할 것.
let token: string = 'TEST_TOKEN_IT_MUST_BE_CHANGED'

export async function getGalleryList() {
    /**
     * 갤러리 이미지 정보 리스트를 반환한다.
     *
     * @returns galleryResponseGetDto 객체
     *
     * @beta
     */

    // const response: AxiosResponse<JSON> = await axios({
    //     method: 'GET',
    //     url: `${SERVER_URL}/gallery`
    // })
    // return response.data

    // START - DUMMY DATA
    return {
        message: '갤러리 목록 불러오기 성공',
        galleryList: [
            {
                userId: 'sanyang',
                title: '피카피카 우는 토끼',
                upload_date: '2024-04-12 12:34:56',
                image: {
                    s3Path: '/s3/.../',
                },
            },
            {
                userId: 'sanyang',
                title: '바보바보 우는 예원',
                upload_date: '2024-05-12 12:34:56',
                image: {
                    s3Path: '/s3/.../',
                },
            },
        ],
    }
    // END - DUMMY DATA
}

export async function getGalleryListByTag(tagList: Array<string>) {
    /**
     * 태그에 해당하는 갤러리 이미지 정보 리스트를 반환한다.
     *
     * @param tagList - tag들이 담긴 Array
     * @returns galleryResponseGetDto 객체
     *
     * @beta
     */

    // TODO: 태그가 비어있다면 getGalleryList를 호출하도록 설정

    // let tagString: string = '';
    // for (let tag in tagList) {
    //     tagString += `${tag},`
    // }
    // // 마지막 comma 제거
    // tagString = tagString.substring(0, tagString.length - 2)

    // const response: AxiosResponse<JSON> = await axios({
    //     method: 'GET',
    //     url: `${SERVER_URL}/gallery/${tagString}`
    // })
    // return response.data

    // START - DUMMY DATA
    return {
        message: '태그 검색 결과',
        galleryList: [
            {
                userId: 'sanyang',
                title: '피카피카 우는 토끼',
                upload_date: '2024-04-12 12:34:56',
                image: {
                    s3Path: '/s3/.../',
                },
            },
        ],
    }
    // END - DUMMY DATA
}
