import React, { useEffect, useState } from 'react'
import styles from './List.module.scss'
import Modal from '@/component/layout/Modal'
import {
    getNoticeDetailResponseDTO,
    modifyNoticeRequestDTO,
    noticeDetailInfo,
    registNoticeRequestDTO,
} from '@/utils/api/DTO/notice'

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
    isDarkMode: boolean
    isEditMode: boolean
    currentPage: number
    fetchData: (page: number) => void
    getDetail: (noticeId: number) => Promise<getNoticeDetailResponseDTO>
    addNotice: (data: registNoticeRequestDTO) => void
    updateNotice: (data: modifyNoticeRequestDTO) => void
    deleteNotice: (noticeId: number) => void
}

const List: React.FC<ListProps> = ({
    width,
    height,
    pageSize,
    columnNames = [],
    columns,
    columnWidth = [],
    currentPage,
    data = [],
    isDarkMode,
    isEditMode,
    fetchData,
    getDetail,
    addNotice,
    updateNotice,
    deleteNotice,
}) => {
    // 지역 변수
    const [isAddModalVisible, setAddModalVisible] = useState(false)
    const [isEditModalVisible, setEditModalVisible] = useState(false)
    const [isDetailModalVisible, setDetailModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState<DataItem>({
        id: 0,
        username: '',
        title: '',
        content: '',
        registDate: '',
        views: 0,
    })

    const [editableItem, setEditableItem] = useState<DataItem>({
        id: 0,
        username: '',
        title: '',
        content: '',
        registDate: '',
        views: 0,
    })

    // 토글 함수
    const toggleAddMode = () => setAddModalVisible(!isAddModalVisible)

    const toggleDetailModal = () => setDetailModalVisible(!isDetailModalVisible)

    const toggleEditModal = () => setEditModalVisible(!isEditModalVisible)

    //훅
    useEffect(() => {
        fetchData(currentPage)
    }, [isAddModalVisible, isEditModalVisible])

    // 이벤트 핸들러
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data: registNoticeRequestDTO = {
            title: event.currentTarget.title1.value,
            content: event.currentTarget.content.value,
        }

        await addNotice(data)

        toggleAddMode()
    }

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data: modifyNoticeRequestDTO = {
            noticeId: parseInt(event.currentTarget.noticeId.value, 10),
            title: event.currentTarget.title1.value,
            content: event.currentTarget.content.value,
        }

        await updateNotice(data)

        toggleEditModal()
    }

    const handleRowClick = async (item: DataItem) => {
        const noticeId = item.id

        const result = await getDetail(noticeId)

        const data: noticeDetailInfo = {
            id: result.data.id || 0,
            username: result.data.username || '',
            title: result.data.title || '',
            content: result.data.content || '',
            registDate: result.data.registDate || '',
            views: result.data.views || 0,
        }

        await setSelectedItem(data)

        setDetailModalVisible(true)
    }

    const handleEditClick = async (event: React.MouseEvent, item: DataItem) => {
        event.stopPropagation()

        const noticeId = item.id

        const result = await getDetail(noticeId)

        const data: noticeDetailInfo = {
            id: result.data.id || 0,
            username: result.data.username || '',
            title: result.data.title || '',
            content: result.data.content || '',
            registDate: result.data.registDate || '',
            views: result.data.views || 0,
        }

        await setEditableItem(data)

        setEditModalVisible(true)
    }

    const handleDelete = async (noticeId: number) => {
        await deleteNotice(noticeId)

        setEditModalVisible(false)
    }

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target
        setEditableItem((prevItem) =>
            prevItem ? { ...prevItem, [name]: value } : null,
        )
    }

    return (
        <>
            <Modal
                width="60%"
                height="fit-content"
                isVisible={isAddModalVisible}
                toggleModal={toggleAddMode}
            >
                <div className={styles.postContainer}>
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ fontSize: '25px' }}>글 작성</h3>
                        <hr></hr>
                        <div className={styles.postTitle}>
                            <label htmlFor="title1">제목</label>
                            <textarea
                                id="title1"
                                name="title1"
                                rows={1}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    resize: 'none',
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
                toggleModal={toggleEditModal}
            >
                <form
                    className={styles.modifyContainer}
                    onSubmit={handleUpdate}
                >
                    <h3 style={{ fontSize: '25px' }}>글 수정</h3>
                    <hr></hr>
                    <>
                        <input
                            type="hidden"
                            name="noticeId"
                            value={editableItem.id}
                        />
                        <div className={styles.modifyTitle}>
                            <textarea
                                id="title1"
                                name="title"
                                value={editableItem.title}
                                rows={1}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    margin: '10px 0',
                                    resize: 'none',
                                }}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.modifyContent}>
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
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.modifyButton}>
                            <button className={styles.blueButton} type="submit">
                                수정
                            </button>
                            <button
                                className={styles.redButton}
                                type="button"
                                onClick={() => handleDelete(editableItem.id)}
                            >
                                삭제
                            </button>
                        </div>
                    </>
                </form>
            </Modal>

            <div style={{ width, height }}>
                <div className={styles.tags}>
                    {isEditMode ? (
                        <button onClick={toggleAddMode}>게시글 작성</button>
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
                                <th style={{ width: '50px' }}>수정</th>
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
                                                handleEditClick(event, item)
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img
                                                style={{ width: '20px' }}
                                                src={
                                                    isDarkMode
                                                        ? '/svgs/edit_white.svg'
                                                        : '/svgs/edit_black.svg'
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
