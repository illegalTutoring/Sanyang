'use client'

import useDarkModeStore from '@/utils/store/useThemaStore'
import List from '@/component/TagList'
import style from './notification.module.scss'

const NotificationPage = () => {
    const { isDarkMode } = useDarkModeStore()

    const getDummyOutsourcingList = async (year: number, month: number) => {
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
                {
                    userId: 'sanyang',
                    client: 'D&F',
                    title: 'D&F 여름 이벤트 일러스트 작업',
                    startDate: '2024-06-01',
                    endDate: '2024-06-30',
                },
                {
                    userId: 'sanyang',
                    client: 'D&F',
                    title: 'D&F 특별 프로모션 일러스트 작업',
                    startDate: '2024-07-01',
                    endDate: '2024-07-31',
                },
                {
                    userId: 'sanyang',
                    client: 'D&F',
                    title: 'D&F 할로윈 이벤트 일러스트 작업',
                    startDate: '2024-10-01',
                    endDate: '2024-10-31',
                },
                {
                    userId: 'sanyang',
                    client: 'D&F',
                    title: 'D&F 크리스마스 이벤트 일러스트 작업',
                    startDate: '2024-12-01',
                    endDate: '2024-12-31',
                },
                {
                    userId: 'sanyang',
                    client: 'D&F',
                    title: 'D&F 새해 기념 일러스트 작업',
                    startDate: '2025-01-01',
                    endDate: '2025-01-31',
                },
                {
                    userId: 'sanyang',
                    client: 'D&F',
                    title: 'D&F 발렌타인 데이 특별 일러스트 작업',
                    startDate: '2025-02-01',
                    endDate: '2025-02-28',
                },
                {
                    userId: 'sanyang',
                    client: 'D&F',
                    title: 'D&F 봄 축제 일러스트 작업',
                    startDate: '2025-03-01',
                    endDate: '2025-03-31',
                },
            ],
        }
    }

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <div className={style.container}>
                <div className={style.banner}>
                    <h1>공지사항 페이지</h1>
                </div>
                <List
                    width="100%"
                    height="40vh"
                    pageSize={10}
                    columns={[
                        'userId',
                        'client',
                        'title',
                        'startDate',
                        'endDate',
                    ]}
                    tagActions={{
                        All: () => getDummyOutsourcingList(2024, 4),
                        Active: () => getDummyOutsourcingList(2024, 4),
                        Completed: () => getDummyOutsourcingList(2024, 4),
                    }}
                />
            </div>
        </article>
    )
}

export default NotificationPage
