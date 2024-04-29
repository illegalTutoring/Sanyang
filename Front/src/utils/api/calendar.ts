import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'

const SERVER_URL = process.env.SERVER_URL

export function getCalendar(year: number, month: number) {
    /**
     * 월별 일정 리스트를 반환한다.
     *
     * @param year - 조회하고자 하는 연도
     * @param month - 조회하고자 하는 월
     * @returns
     * {
     *      message: string,
     *      data: [
     *          {
     *              calendarId: int,
     *              userId: string,
     *              company: string,
     *              title: string,
     *              startDate: string,
     *              endDate: string,
     *          },
     *          ...
     *      ]
     * }
     */

    return axiosRequestHandler(
        async (year: number, month: number) => {
            const response: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `${SERVER_URL}/calendar/${year}/${month}`,
            })
            return {
                message: response.data.message,
                data: response.data.data,
            }
        },
        [year, month],
    )

    // START - DUMMY DATA
    // return {
    //     message: `${year}년 ${month}월 일정 목록입니다.`,
    //     data: [
    //         {
    //             calendarId: 2,
    //             userId: 'sanyang',
    //             company: 'D&F',
    //             title: 'D&F 신규 캐릭터 일러스트 작업',
    //             startDate: '2024-04-01',
    //             endDate: '2024-04-30',
    //         },
    //         {
    //             calendarId: 3,
    //             userId: 'sanyang',
    //             company: 'D&F',
    //             title: 'D&F 신규 업데이트 일러스트 작업',
    //             startDate: '2024-05-01',
    //             endDate: '2024-05-31',
    //         },
    //     ],
    // }
    // END - DUMMY DATA
}
