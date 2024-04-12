import axios from 'axios'

const server_url = process.env.SERVER_URL

export async function getOutsourcingList(year: number, month: number) {
    /**
     * 월별 외주 리스트를 반환한다.
     *
     * @param year - 조회하고자 하는 연도
     * @param month - 조회하고자 하는 월
     * @returns outsourcingResponseGetDto 객체
     *
     * @beta
     */

    // const response = await axios({
    //     method: 'GET',
    //     url: `${server_url}/outsourcing/${year}/${month}`,
    // })
    // return response.data

    // START - DUMMY DATA
    return {
        message: `${year}년 ${month}월 외주 목록입니다.`,
        outsourcingInfo: [
            {
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 캐릭터 일러스트 작업',
                startDate: '2024-04-01',
                endDate: '2024-04-30',
            },
            {
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
     * @param outsourcing_id - 조회하고자 하는 외주의 id
     * @param password - 사용자가 입력한 비밀번호
     * @returns outsourcingDetailResponsePostDto 객체
     *
     * @beta
     */

    // const response = await axios({
    //     method: 'POST',
    //     url: `${server_url}/outsourcing/${outsourcing_id}`,
    //     data: {
    //         password: password,
    //     },
    // })
    // return response.data

    // START - DUMMY DATA
    return {
        message: '외주 비밀번호 일치',
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
    // END- DUMMY DATA
}

export async function searchOutsourcingByName(keyword: string) {
    /**
     * 입력한 비밀번호가 올바르다면, 외주 상세 정보를 반환한다.
     *
     * @param keyword - 검색하고자 하는 외주의 이름
     * @returns outsourcingSearchResponseGetDto 객체
     *
     * @beta
     */

    // const response = await axios({
    //     method: 'GET',
    //     url: `${server_url}/outsourcing/search/${keyword}`,
    // })
    // return response.data

    // START - DUMMY DATA
    return {
        message: "'D&F' 로 검색된 결과입니다.",
        outsourcingSearchList: [
            {
                userId: 'sanyang',
                client: 'D&F',
                title: 'D&F 신규 캐릭터 일러스트 작업',
                startDate: '2024-04-01',
                endDate: '2024-04-30',
            },
            {
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
