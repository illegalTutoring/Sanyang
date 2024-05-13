'use client'

import styles from './notification.module.scss'
import React, { useState, useEffect } from 'react'
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore'
import List from '@/component/List'
import Pagination from '@/component/Pagination'
import { getNoticeList } from '@/utils/api/notice'
import { noticeInfo } from '@/utils/api/DTO/notice'

const NotificationPage = () => {
    // 전역 변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    // 지역 변수
    // const [data, setData] = useState<noticeInfo[]>([])

    const data = [
        {
            id: 1,
            title: '제목',
            registDate: 'YYYY-MM-DD',
        },
        {
            id: 2,
            title: '제목',
            registDate: 'YYYY-MM-DD',
        },
    ]

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7

    // 함수
    const fetchData = async (page: number) => {
        const response = await getNoticeList(page, itemsPerPage)
        console.log(response.data)
        // setData(response.data)
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
                        columnNames={['No', '제목', '등록일자']}
                        columns={['id', 'title', 'registDate']}
                        columnWidth={['1%', '70%', '30%']}
                        data={data}
                        isEditMode={isEditMode}
                    />
                </div>
                <Pagination
                    totalPage={20}
                    limit={itemsPerPage}
                    page={currentPage}
                    setPage={setCurrentPage}
                />
            </div>
        </article>
    )
}

export default NotificationPage
