import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'
import { getWorkListResponseDTO } from './DTO/work'

export function getWorkList(): getWorkListResponseDTO {
    /**
     * 외주 이미지 정보 목록을 반환한다.
     *
     * @returns
     * {
     *      message: string,
     *      data: [
     *          {
     *              workId: number,
                    userId: String,
                    title: String,
                    company: String,
                    startDate: String,
                    endDate: String,
                    uploadDate: String,
                    tags: Array<String>,
                    original: String,
                    thumbnail: String,
                    watermark: String,
     *          },
     *          ...
     *      ]
     * }
     */

    return axiosRequestHandler(async () => {
        const response: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `${process.env.SERVER_URL}/work`,
        })
        return {
            message: response.data.message,
            data: response.data.data,
        }
    }, [])

    // START - DUMMY DATA
    /* 
    return {
        message: string,
        data: [
            {
                workId: 1,
                userId: "sanyang",
                title: "d&f 캐릭터 작업",
                company: "d&f",
                startDate: "2024-04-01"
                endDate: "2024-04-30"
                uploadDate: "2024-04-12 12:12:12",
                tags: ["d&f", "캐릭터"],
                original: "s3 path",
                thumbnail: "s3 path thumbnail",
                watermark: "s3 path watermark"
            },
            {
                workId: 2,
                userId: "sanyang",
                title: "d&f 캐릭터 작업22",
                company: "d&f22",
                startDate: "2024-03-01"
                endDate: "2024-03-30"
                uploadDate: "2024-04-12 12:12:12",
                tags: ["d&f", "캐릭터"],
                original: "s3 path22",
                thumbnail: "s3 path thumbnail",
                watermark: "s3 path watermark"
            }
        ]
    }
    */
    // END - DUMMY DATA
}
