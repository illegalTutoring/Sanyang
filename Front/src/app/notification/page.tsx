'use client'

import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore'
import List from '@/component/TagList'
import Pagination from '@/component/Pagination'
import styles from './notification.module.scss'
import React, { useState, useEffect } from 'react'

const NotificationPage = () => {
    // 전역 변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    // 지역 변수
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // 데이터 가져오기
    const fetchData = async (page: number) => {
        console.log('fetchData:', page)

        // try {
        //     const response = await axios.get(
        //         `https://your-api-url.com/notifications?page=${page}`,
        //     )
        //     setData(response.data.notifications)
        // } catch (error) {
        //     console.error('Failed to fetch data:', error)
        // }

        return {
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

    useEffect(() => {
        fetchData(currentPage)
    }, [currentPage])

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
                        data={data}
                        tagActions={{
                            All: () => fetchData(currentPage),
                            Update: () => fetchData(currentPage),
                            Notice: () => fetchData(currentPage),
                        }}
                        isEditMode={isEditMode}
                    />
                </div>
                <Pagination
                    totalPage={100}
                    limit={itemsPerPage}
                    page={currentPage}
                    setPage={setCurrentPage}
                />
            </div>
        </article>
    )
}

export default NotificationPage
