import React, { useState, useEffect } from 'react'
import styles from './TagList.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'

interface DataItem {
    [key: string]: any
}

interface ListProps {
    width: string
    height: string
    pageSize: number
    columns: string[]
    data: DataItem[]
    tagActions: {
        [tag: string]: () => void
    }
}

const List: React.FC<ListProps> = ({
    width,
    height,
    pageSize,
    columns,
    data,
    tagActions,
}) => {
    const tags = Object.keys(tagActions)
    const { isDarkMode } = useDarkModeStore()
    const [activeTag, setActiveTag] = useState(tags[0])

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
                        onClick={() => {
                            tagActions[tag]()
                        }}
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
                    {data.slice(0, pageSize).map((item, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={`${index}-${column}`}>
                                    {item[column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List
