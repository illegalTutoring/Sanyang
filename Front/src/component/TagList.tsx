'use client'

import React, { useState, useEffect } from 'react'
import styles from './TagList.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'

interface DataItem {
    [key: string]: any
}

interface TagActionMap {
    [tag: string]: () => Promise<any>
}

interface ListProps {
    width: string
    height: string
    pageSize: number
    columns: string[]
    tagActions: TagActionMap
}

const List: React.FC<ListProps> = ({
    width,
    height,
    pageSize,
    columns,
    tagActions,
}) => {
    const [data, setData] = useState<DataItem[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [activeTag, setActiveTag] = useState<string>('All')

    useEffect(() => {
        fetchData('All')
    }, [])

    const fetchData = async (tag: string) => {
        try {
            const response = await tagActions[tag]()
            setActiveTag(tag)
            setData(response.outsourcingInfo)
        } catch (error) {
            console.error('Failed to fetch data:', error)
        }
    }

    const tags = Object.keys(tagActions)
    const { isDarkMode } = useDarkModeStore()

    return (
        <div style={{ width, height }}>
            <div className={styles.tags}>
                {tags.map((tag) => (
                    <button
                        className={
                            activeTag === tag
                                ? isDarkMode
                                    ? styles.darkActive
                                    : styles.lightActive
                                : ''
                        }
                        key={tag}
                        onClick={() => fetchData(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <table className={styles.table}>
                <thead>
                    <tr
                        className={`${isDarkMode ? styles.dark : styles.light}`}
                    >
                        {columns.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column}>{item[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List
