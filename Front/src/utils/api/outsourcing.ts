import axios, { AxiosResponse } from 'axios'
import { axiosRequestHandler } from './interceptor'

const SERVER_URL = process.env.SERVER_URL

export async function getOutsourcingList(year: number, month: number) {
    /**
     * 월별 외주 리스트를 반환한다.
     *
     * @beta
     * @todo
     * 테스트
     *
     * @param year - 조회하고자 하는 연도
     * @param month - 조회하고자 하는 월
     * @returns
     * {
     *      message: string,
     *      outsourcingList: [
     *          {
     *              outsourcingId: int,
     *              userId: string,
     *              client: string,
     *              title: string,
     *              startDate: string,
     *              endDate: string,
     *          },
     *          ...
     *      ]
     * }
     */

    // return axiosRequestHandler(async (year: number, month: number) => {
    //     const response: AxiosResponse<any, any> = await axios({
    //         method: 'GET',
    //         url: `${SERVER_URL}/outsourcing/${year}/${month}`
    //     })
    //     return response.data
    // }, [year, month])

    // START - DUMMY DATA
    return {
        message: `${year}년 ${month}월 외주 목록입니다.`,
        outsourcingInfo: [
            {
                outsourcingId: 2,
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 캐릭터 일러스트 작업',
                startDate: '2024-04-01',
                endDate: '2024-04-30',
            },
            {
                outsourcingId: 3,
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 업데이트 일러스트 작업',
                startDate: '2024-05-01',
                endDate: '2024-05-31',
            },
        ],
    }
    // END - DUMMY DATA
}

export async function insertOutsourcingPassword(
    outsourcing_id: string,
    password: string,
) {
    /**
     * 입력한 비밀번호가 올바르다면, 외주 상세 정보를 반환한다.
     *
     * @beta
     * @todo
     * 테스트
     *
     * @param outsourcing_id - 조회하고자 하는 외주의 id
     * @param password - 사용자가 입력한 비밀번호
     * @returns
     * {
     *      message: string,
     *      outsourcingInfo: [
     *          {
     *              outsourcingId: int,
     *              userId: string,
     *              client: string,
     *              title: string,
     *              content: string,
     *              images: [
     *                  {
     *                      imagePath: string
     *                  },
     *                  ...
     *              ]
     *          }
     *      ]
     * }
     */

    // return axiosRequestHandler(async (outsourcing_id: string, password: string) => {
    //     const response: AxiosResponse<any, any> = await axios({
    //         method: 'POST',
    //         url: `${SERVER_URL}/outsourcing/${outsourcing_id}`,
    //         data: {
    //             password,
    //         },
    //     })
    //     return response.data
    // }, [outsourcing_id, password])

    // START - DUMMY DATA
    return {
        message: '외주 비밀번호 일치',
        outsourcingInfo: [
            {
                outsourcingId: 2,
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 캐릭터 일러스트 작업',
                content: '작업 내용 (Contents)',
                image: [
                    {
                        imagePath: '/s3/...',
                    },
                    {
                        imagePath: '/s3/...',
                    },
                ],
            },
            {
                outsourcingId: 3,
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 업데이트 일러스트 작업',
                content: '작업 내용 (Contents)',
                image: [
                    {
                        imagePath: '/s3/...',
                    },
                    {
                        imagePath: '/s3/...',
                    },
                ],
            },
        ],
    }
    // END- DUMMY DATA
}

export async function searchOutsourcingByName(keyword: string) {
    /**
     * 외주 이름으로 외주 검색
     *
     * @beta
     * @todo
     * 테스트
     *
     * @param keyword - 검색하고자 하는 외주의 이름
     * @returns
     * {
     *      message: string,
     *      outsourcingSearchList: [
     *          {
     *              outsourcingId: int,
     *              userId: string,
     *              client: string,
     *              title: string,
     *              startDate: string,
     *              endDate: string,
     *          },
     *          {
     *              outsourcingId: int,
     *              userId: string,
     *              client: string,
     *              title: string,
     *              startDate: string,
     *              endDate: string,
     *          }
     *      ],
     *  }
     */

    // return axiosRequestHandler(async (keyword: string) => {
    //     const response: AxiosResponse<any, any> = await axios({
    //         method: 'GET',
    //         url: `${SERVER_URL}/outsourcing/search/${keyword}`
    //     })
    //     return response.data
    // }, [keyword])

    // START - DUMMY DATA
    return {
        message: "'D&F' 로 검색된 결과입니다.",
        outsourcingSearchList: [
            {
                outsourcingId: 2,
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 캐릭터 일러스트 작업',
                startDate: '2024-04-01',
                endDate: '2024-04-30',
            },
            {
                outsourcingId: 3,
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 업데이트 일러스트 작업',
                startDate: '2024-05-01',
                endDate: '2024-05-31',
            },
        ],
    }
    // END- DUMMY DATA
}

export async function getOutsourcingDetail(outsourcing_id: string) {
    /**
     * 외주 상세 정보를 반환한다.
     *
     * @beta
     * @todo
     * 테스트
     * 
     * @param outsourcing_id - 조회하고자 하는 외주의 id
     * @returns 
     * {
            message: string,
            outsourcingInfo: [
                {
                    outsourcingId: int,
                    userId: string,
                    client: string,
                    title: string,
                    content: string,
                    images: [
                        {
                            imagePath: string,
                        },
                        {
                            imagePath: string,
                        }
                    ],
                },
                ...
            ],
        }
     */

    // return axiosRequestHandler(async (outsourcing_id: string) => {
    //     const response: AxiosResponse<any, any> = await axios({
    //             method: 'GET',
    //             url: `${SERVER_URL}/outsourcing/detail/${outsourcing_id}`
    //         })
    //         return response.data
    // }, [outsourcing_id])

    // START - DUMMY DATA
    return {
        message: '외주 상세페이지 조회 완료',
        outsourcingInfo: [
            {
                outsourcingId: 2,
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 캐릭터 일러스트 작업',
                content: '작업 내용 (Contents)',
                images: [
                    {
                        imagePath: '/s3/...',
                    },
                    {
                        imagePath: '/s3/...',
                    },
                ],
            },
            {
                outsourcingId: 3,
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 업데이트 일러스트 작업',
                content: '작업 내용 (Contents)',
                images: [
                    {
                        imagePath: '/s3/...',
                    },
                    {
                        imagePath: '/s3/...',
                    },
                ],
            },
        ],
    }
    // END - DUMMY DATA
}
