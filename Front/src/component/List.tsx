import React, { useState } from 'react'
import styles from './List.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'
import Modal from './layout/Modal'
import { title } from 'process'
import { modifyCalendar } from '@/utils/api/admin'

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
    }

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const title = event.currentTarget.title1.value
        const content = event.currentTarget.content.value

        console.log('Updating:', title, content)
    }

    const handleRowClick = (item: DataItem) => {
        //Axios 요청으로 notice 상세정보 가져오기
        setSelectedItem({
            id: 18,
            username: 'admin',
            title: '공지',
            content: '공지입니다.',
            registDate: '2024-05-02',
            views: 3,
        })

        setIsDetailModalVisible(true)
    }

    const handleDelete = (index: number) => {
        console.log(`Deleting item at index ${index}`)
    }

    const handleEditClick = (event: React.MouseEvent) => {
        event.stopPropagation()

        //Axios 요청으로 notice 상세정보 가져오기
        setEditableItem({
            id: 18,
            username: 'admin',
            title: '공지',
            content: '공지입니다.',
            registDate: '2024-05-02',
            views: 3,
        })

        setIsEditModalVisible(true)
    }

    return (
        <>
            <Modal
                width="60%"
                height="fit-content"
                isVisible={isAddMode}
                toggleModal={toggleEditMode}
            >
                <div className={styles.postContainer}>
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ fontSize: '25px' }}>글 작성</h3>
                        <hr></hr>
                        <div className={styles.postTitle}>
                            <label htmlFor="title1">제목</label>
                            <input
                                id="title1"
                                name="title1"
                                type="text"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                }}
                            />
                        </div>
                        <div className={styles.postContent}>
                            <label htmlFor="content">내용</label>
                            <textarea
                                id="content"
                                name="content"
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    resize: 'none',
                                }}
                            />
                        </div>
                        <div className={styles.postButton}>
                            <button type="submit">게시</button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal
                width="50%"
                height="fit-content"
                isVisible={isDetailModalVisible}
                toggleModal={toggleDetailModal}
            >
                <div className={styles.detailContainer}>
                    <h3 className={styles.detailTitle}>
                        {selectedItem && selectedItem.title}
                    </h3>
                    <div className={styles.detailInfo}>
                        <div>{selectedItem && selectedItem.registDate}</div>
                        <div>조회수: {selectedItem && selectedItem.views}</div>
                    </div>
                    <div className={styles.detailContent}>
                        {selectedItem && selectedItem.content}
                    </div>
                </div>
            </Modal>

            <Modal
                width="50%"
                height="fit-content"
                isVisible={isEditModalVisible}
                toggleModal={() => setIsEditModalVisible(false)}
            >
                <form
                    className={styles.modifyContainer}
                    onSubmit={handleUpdate}
                >
                    <h3 style={{ fontSize: '25px' }}>글 수정</h3>
                    <hr></hr>
                    <div className={styles.modifyTitle}>
                        {editableItem && (
                            <>
                                <input
                                    id="title1"
                                    name="title1"
                                    type="text"
                                    value={editableItem.title}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        margin: '10px 0',
                                    }}
                                />
                            </>
                        )}
                    </div>
                    <div className={styles.modifyContent}>
                        {editableItem && (
                            <div>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={editableItem.content}
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        resize: 'none',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.modifyButton}>
                        <button className={styles.blueButton} type="submit">
                            수정
                        </button>
                        {editableItem && (
                            <button
                                className={styles.redButton}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    handleDelete(editableItem.id)
                                }}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                </form>
            </Modal>

            <div style={{ width, height }}>
                <div className={styles.tags}>
                    {isEditMode ? (
                        <button onClick={toggleEditMode}>게시글 작성</button>
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
                                <th style={{ width: '15%' }}>수정</th>
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
                                    <td>
                                        <div
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                //여기서 ID 넘겨줘야됨
                                                handleEditClick(event)
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img
                                                style={{ width: '20px' }}
                                                src={
                                                    isDarkMode
                                                        ? 'svgs/edit_white.svg'
                                                        : 'svgs/edit_black.svg'
                                                }
                                                alt=""
                                            />
                                        </div>
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
