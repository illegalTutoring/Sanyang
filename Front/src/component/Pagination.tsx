import React, { useEffect, useState } from 'react'
import {
    FaAngleDoubleLeft,
    FaAngleLeft,
    FaAngleRight,
    FaAngleDoubleRight,
} from 'react-icons/fa'
import styles from './Pagination.module.css'

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
    const [totalPageArray, setTotalPageArray] = useState<number[][]>([])

    useEffect(() => {
        const startIndex = Math.floor((page - 1) / limit) * limit
        if (totalPageArray.length > 0) {
            setCurrentPageArray(totalPageArray[Math.floor(startIndex / limit)])
        }
    }, [page, totalPageArray, limit])

    useEffect(() => {
        const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
        const slicedPageArray = sliceArrayByLimit(pages, limit)
        setTotalPageArray(slicedPageArray)
        setCurrentPageArray(slicedPageArray[0])
    }, [totalPage, limit])

    function sliceArrayByLimit(array: number[], limit: number): number[][] {
        return new Array(Math.ceil(array.length / limit))
            .fill(null)
            .map((_, i) => array.slice(i * limit, i * limit + limit))
    }

    return (
        <div className={styles.paginationWrapper}>
            <FaAngleDoubleLeft
                onClick={() => setPage(1)}
                className={page === 1 ? styles.pageButtonDisabled : ''}
            />
            <FaAngleLeft
                onClick={() => setPage(page - 1)}
                className={page === 1 ? styles.pageButtonDisabled : ''}
            />
            <div className={styles.buttonWrapper}>
                {currentPageArray.map((i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`${styles.pageButton} ${page === i ? styles.pageButtonActive : ''}`}
                        aria-current={page === i ? 'page' : undefined}
                    >
                        {i}
                    </button>
                ))}
            </div>
            <FaAngleRight
                onClick={() => setPage(page + 1)}
                className={page === totalPage ? styles.pageButtonDisabled : ''}
            />
            <FaAngleDoubleRight
                onClick={() => setPage(totalPage)}
                className={page === totalPage ? styles.pageButtonDisabled : ''}
            />
        </div>
    )
}

export default Pagination
