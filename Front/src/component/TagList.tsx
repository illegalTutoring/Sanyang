import React, { useState } from 'react'
import styles from './TagList.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'
import Modal from './layout/Modal'

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
    isEditMode: boolean
}

const List: React.FC<ListProps> = ({
    width,
    height,
    pageSize,
    columns,
    data,
    tagActions,
    isEditMode,
}) => {
    const tags = Object.keys(tagActions)
    const { isDarkMode } = useDarkModeStore()
    const [activeTag, setActiveTag] = useState(tags[0])
    const [isAddMode, setIsAddMode] = useState(false)
    const [selectedItem, setSelectedItem] = useState<DataItem | null>(null)
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

    const toggleEditMode = () => {
        setIsAddMode(!isAddMode)
    }

    const toggleDetailModal = () => {
        setIsDetailModalVisible(!isDetailModalVisible)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const title = event.currentTarget.title1.value
        const content = event.currentTarget.content.value

        console.log('Submitting:', title, content)
        toggleEditMode()
    }

    const handleRowClick = (item: DataItem) => {
        setSelectedItem(item)
        setIsDetailModalVisible(true)
    }

    const handleDelete = (index: number) => {
        console.log(`Deleting item at index ${index}`)
        // Delete logic here
    }

    return (
        <>
            <Modal
                width="60%"
                isVisible={isAddMode}
                toggleModal={toggleEditMode}
            >
                <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                    <div>
                        <label htmlFor="title1">Title:</label>
                        <input
                            id="title1"
                            name="title1"
                            type="text"
                            style={{
                                width: '100%',
                                padding: '8px',
                                margin: '10px 0',
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            rows={4}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '8px 16px' }}>
                        Post
                    </button>
                </form>
            </Modal>
            <Modal
                width="50%"
                isVisible={isDetailModalVisible}
                toggleModal={toggleDetailModal}
            >
                <div style={{ padding: '20px' }}>
                    <h3>Details</h3>
                    {selectedItem &&
                        Object.entries(selectedItem).map(([key, value]) => (
                            <p key={key}>
                                <strong>{key}:</strong> {value}
                            </p>
                        ))}
                </div>
            </Modal>
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
                                setActiveTag(tag)
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                    {isEditMode ? (
                        <button onClick={toggleEditMode}>post</button>
                    ) : (
                        <div></div>
                    )}
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr className={isDarkMode ? styles.dark : styles.light}>
                            {columns.map((column) => (
                                <th key={column}>{column}</th>
                            ))}
                            {isEditMode && <th>Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => handleRowClick(item)}
                            >
                                {columns.map((column) => (
                                    <td key={`${index}-${column}`}>
                                        {item[column]}
                                    </td>
                                ))}
                                {isEditMode && (
                                    <td>
                                        <img
                                            className={styles.deleteButton}
                                            style={{ height: '15px' }}
                                            src={'/svgs/delete.svg'}
                                            alt="Delete"
                                            onClick={(event) =>
                                                handleDelete(index)
                                            }
                                        />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default List
