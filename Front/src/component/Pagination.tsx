import React, { useEffect, useState } from 'react'
import {
    FaAngleDoubleLeft,
    FaAngleLeft,
    FaAngleRight,
    FaAngleDoubleRight,
} from 'react-icons/fa'
import styles from './Pagination.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'

interface PaginationProps {
    totalPage: number
    limit: number
    page: number
    setPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
    totalPage,
    limit,
    page,
    setPage,
}) => {
    const [currentPageArray, setCurrentPageArray] = useState<number[]>([])
    const { isDarkMode } = useDarkModeStore()

    useEffect(() => {
        updateCurrentPageArray(page, totalPage)
    }, [page, totalPage])

    function updateCurrentPageArray(currentPage: number, totalPage: number) {
        const centerIndex = Math.floor(limit / 2)
        let startPage = Math.max(currentPage - centerIndex, 1)
        let endPage = startPage + limit - 1

        if (endPage > totalPage) {
            endPage = totalPage
            startPage = Math.max(endPage - limit + 1, 1)
        }

        const newPageArray = Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i,
        )

        setCurrentPageArray(newPageArray)
    }

    return (
        <div>
            <div className={styles.paginationWrapper}>
                <FaAngleDoubleLeft
                    onClick={() => setPage(1)}
                    className={styles.arrowButton}
                />
                <FaAngleLeft
                    onClick={() => setPage(Math.max(page - 1, 1))}
                    className={styles.arrowButton}
                />
                <div className={styles.buttonWrapper}>
                    {currentPageArray.map((i) => (
                        <div
                            key={i}
                            onClick={() => setPage(i)}
                            className={`${styles.pageButton} ${
                                page === i
                                    ? isDarkMode
                                        ? styles.pageButtonActive
                                        : styles.pageButtonActiveDark
                                    : ''
                            }`}
                            aria-current={page === i ? 'page' : undefined}
                        >
                            {i}
                        </div>
                    ))}
                </div>
                <FaAngleRight
                    onClick={() => setPage(Math.min(page + 1, totalPage))}
                    className={styles.arrowButton}
                />
                <FaAngleDoubleRight
                    onClick={() => setPage(totalPage)}
                    className={styles.arrowButton}
                />
            </div>
        </div>
    )
}

export default Pagination
