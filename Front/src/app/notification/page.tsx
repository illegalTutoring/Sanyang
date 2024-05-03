'use client'

import useDarkModeStore from '@/utils/store/useThemaStore'
import List from '@/component/TagList'
import styles from './notification.module.scss'

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
            ],
        }
    }

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <div className={styles.container}>
                <div
                    className={`${styles.banner} ${isDarkMode ? styles.darkBanner : styles.lightBanner}`}
                >
                    <div style={{ fontSize: '46px' }}>공지사항</div>
                    <br></br>
                    <h3 style={{ fontSize: '16px' }}>
                        작품의 업데이트 정보 등 관련된 다양한 소식을
                        알려드립니다.
                    </h3>
                </div>
                <div className={styles.list}>
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
                            Update: () => getDummyOutsourcingList(2024, 4),
                            Notice: () => getDummyOutsourcingList(2024, 4),
                        }}
                    />
                </div>
            </div>
        </article>
    )
}

export default NotificationPage
