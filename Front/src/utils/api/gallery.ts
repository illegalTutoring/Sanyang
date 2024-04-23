import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'

const SERVER_URL = process.env.SERVER_URL

// TODO: 갤러리 상세보기

export function getGalleryList() {
    /**
     * 갤러리 이미지 정보 리스트를 반환한다.
     *
     * @beta
     * @todo
     * 테스트
     *
     * @returns galleryResponseGetDto 객체
     *
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `${SERVER_URL}/gallery`,
        })
        return {
            message: response.data.message,
            galleryList: response.data.galleryList,
        }
    }, [])

    // START - DUMMY DATA
    // return {
    //     message: '갤러리 목록 불러오기 성공',
    //     galleryList: [
    //         {
    //             userId: 'sanyang',
    //             title: '피카피카 우는 토끼',
    //             upload_date: '2024-04-12 12:34:56',
    //             image: {
    //                 s3Path: '/s3/.../',
    //             },
    //         },
    //         {
    //             userId: 'sanyang',
    //             title: '바보바보 우는 예원',
    //             upload_date: '2024-05-12 12:34:56',
    //             image: {
    //                 s3Path: '/s3/.../',
    //             },
    //         },
    //     ],
    // }
    // END - DUMMY DATA
}

export function getGalleryListByTag(tagList: Array<string>) {
    /**
     * 태그에 해당하는 갤러리 이미지 정보 리스트를 반환한다.
     *
     * @beta
     * @todo
     * 테스트
     *
     * @param tagList - tag들이 담긴 Array
     * @returns galleryResponseGetDto 객체
     *
     */

    if (tagList.length === 0) return getGalleryList()

    let tagString: string = ''
    for (let tag in tagList) {
        tagString += `${tag},`
    }
    // 마지막 comma 제거
    tagString = tagString.substring(0, tagString.length - 2)

    return axiosRequestHandler(
        async (tagString: string) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `${SERVER_URL}/gallery/${tagString}`,
            })
            return {
                message: response.data.message,
                galleryList: response.data.galleryList,
            }
        },
        [tagString],
    )

    // START - DUMMY DATA
    // return {
    //     message: '태그 검색 결과',
    //     galleryList: [
    //         {
    //             userId: 'sanyang',
    //             title: '피카피카 우는 토끼',
    //             upload_date: '2024-04-12 12:34:56',
    //             image: {
    //                 s3Path: '/s3/.../',
    //             },
    //         },
    //     ],
    // }
    // END - DUMMY DATA
}
