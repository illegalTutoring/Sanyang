export async function getOutsourcingDetail(outsourcing_id: string) {
    /**
     * 외주 상세 정보를 반환한다.
     *
     * @param outsourcing_id - 조회하고자 하는 외주의 id
     * @returns outsourcingDetailResponseGetDto 객체
     *
     * @beta
     */

    // const response = await axios({
    //     method: 'GET',
    //     url: `${server_url}/admin/outsourcing/detail/${outsourcing_id}`,
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
