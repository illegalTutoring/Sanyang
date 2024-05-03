'use client'

import useDarkModeStore from '@/utils/store/useThemaStore'
import List from '@/component/TagList'
import Pagination from '@/component/Pagination'
import styles from './notification.module.scss'
import React, { useState } from 'react'

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

    // 데이터 예제
    const data = Array.from({ length: 200 }, (_, index) => `Item ${index + 1}`)
    const itemsPerPage = 10 // 한 페이지에 표시할 아이템 수

    // 페이징 상태
    const [currentPage, setCurrentPage] = useState(1)
    const totalPage = Math.ceil(data.length / itemsPerPage)

    // 현재 페이지에 따라 데이터를 잘라서 표시
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    )

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
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
                        height="100%"
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
                <Pagination
                    totalPage={totalPage}
                    limit={itemsPerPage}
                    page={currentPage}
                    setPage={handlePageChange}
                />
            </div>
        </article>
    )
}

export default NotificationPage
