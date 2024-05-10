'use client'

import styles from './notification.module.scss'
import React, { useState, useEffect } from 'react'
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore'
import List from '@/component/TagList'
import Pagination from '@/component/Pagination'

import {
    getNoticeList,
    getNoticeDetail,
    getTotalNotice,
} from '@/utils/api/notice'

import { noticeInfo } from '@/utils/api/DTO/notice'

const NotificationPage = () => {
    // 전역 변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    // 지역 변수
    const [data, setData] = useState<noticeInfo[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // 함수
    const fetchData = async (page: number) => {
        const response = await getNoticeList(page, itemsPerPage)
        console.log(response.data)
        setData(response.data)
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
                        columns={['ID', 'title', 'registDate']}
                        columnWidth={['10%', '70%', '20%']}
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
