import React, { useState } from 'react'
import styles from './List.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'
import Modal from './layout/Modal'

interface DataItem {
    [key: string]: any
}

interface ListProps {
    width: string
    height: string
    pageSize: number
    columnNames: string[]
    columns: string[]
    columnWidth: string[]
    data: DataItem[]
    isEditMode: boolean
}

const List: React.FC<ListProps> = ({
    width,
    height,
    pageSize,
    columnNames,
    columns,
    columnWidth,
    data,
    isEditMode,
}) => {
    const { isDarkMode } = useDarkModeStore()
    const [isAddMode, setIsAddMode] = useState(false)
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState<DataItem | null>(null)
    const [editableItem, setEditableItem] = useState<DataItem | null>(null)

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
    }

    const handleEditClick = (event: React.MouseEvent, item: DataItem) => {
        event.stopPropagation()
        setEditableItem({ ...item })
        setIsEditModalVisible(true)
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

            <Modal
                width="50%"
                isVisible={isEditModalVisible}
                toggleModal={() => setIsEditModalVisible(false)}
            >
                <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                    <h3>Edit Item</h3>
                    {editableItem &&
                        Object.keys(editableItem).map((key) => (
                            <div key={key}>
                                <label>{key}:</label>
                                <input
                                    type="text"
                                    value={editableItem[key]}
                                    onChange={(e) =>
                                        setEditableItem({
                                            ...editableItem,
                                            [key]: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                    }}
                                />
                            </div>
                        ))}
                    <button type="submit">Save Changes</button>
                </form>
            </Modal>

            <div style={{ width, height }}>
                <div className={styles.tags}>
                    {isEditMode ? (
                        <button onClick={toggleEditMode}>post</button>
                    ) : (
                        <div></div>
                    )}
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr className={isDarkMode ? styles.dark : styles.light}>
                            {columnNames.map((column, index) => (
                                <th
                                    key={column}
                                    style={{ width: columnWidth[index] }}
                                >
                                    {column}
                                </th>
                            ))}
                            {isEditMode && (
                                <>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => handleRowClick(item)}
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={`${rowIndex}-${column}`}
                                        style={{ width: columnWidth[colIndex] }}
                                    >
                                        {item[column]}
                                    </td>
                                ))}
                                {isEditMode && (
                                    <>
                                        <td>
                                            <button
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    handleDelete(rowIndex)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    handleEditClick(event, item)
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </>
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
