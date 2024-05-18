'use client'

import styles from './notification.module.scss'
import React, { useState, useEffect } from 'react'

// Store
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore'

// Component
import List from '@/component/List'
import Pagination from '@/component/Pagination'

// API
import { getNoticeList, getNoticeDetail } from '@/utils/api/notice'
import { registNotice, modifyNotice, deleteNotice } from '@/utils/api/admin'

//DTO
import { noticeInfo } from '@/utils/api/DTO/notice'

const NotificationPage = () => {
    // 전역 변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    // 지역 변수
    const [data, setData] = useState<noticeInfo[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const itemsPerPage = 10

    // 함수
    const fetchData = async (page: number) => {
        const response = (await getNoticeList(page, itemsPerPage)) || []
        setTotalPage(response.page)
        setData(response.data)
    }

    // 훅
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
                        columnWidth={['1%', 'auto', '170px']}
                        data={data}
                        isDarkMode={isDarkMode}
                        isEditMode={isEditMode}
                        currentPage={currentPage}
                        fetchData={fetchData}
                        getDetail={getNoticeDetail}
                        updateNotice={modifyNotice}
                        deleteNotice={deleteNotice}
                        addNotice={registNotice}
                    />
                </div>
                <Pagination
                    totalPage={totalPage}
                    limit={itemsPerPage}
                    page={currentPage}
                    setPage={setCurrentPage}
                />
            </div>
        </article>
    )
}

export default NotificationPage
