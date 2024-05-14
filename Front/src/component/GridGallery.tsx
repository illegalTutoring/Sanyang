'use client'

import React, { use, useEffect, useState } from 'react'
import styles from './GridGallery.module.scss'
import {
    modifyWorkRequestDTO,
    registWorkRequestDTO,
} from '@/utils/api/DTO/work'
import Modal from './layout/Modal'

export interface ImageData {
    workId?: number
    galleryId?: number
    userId?: string
    title?: string
    company?: string
    startDate?: string
    endDate?: string
    uploadDate?: string
    tags?: string[]
    original?: string
    thumbnail?: string
}

export interface GalleryProps {
    images: ImageData[]
    colCount: number
    width?: string
    height?: string
    isEditMode?: boolean
    isDarkMode?: boolean
    fetchGallery?: () => void
    addGallery?: (data: registWorkRequestDTO, image: File) => void
    updateGallery?: (data: modifyWorkRequestDTO, image: File | null) => void
    deleteGallery?: (workId: number) => void
}

const GridGallery: React.FC<GalleryProps> = ({
    images = [],
    colCount,
    width,
    height,
    isEditMode = false,
    isDarkMode = false,
    fetchGallery,
    addGallery,
    updateGallery,
    deleteGallery,
}) => {
    // 지역변수
    const [isAddMode, setAddMode] = useState(false)
    const [isUpdateMode, setUpdateMode] = useState(false)
    const [insertData, setInsertData] = useState({
        WorkId: -1,
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        tags: '',
    })
    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    // 토글 함수
    const toggleAddMode = () => {
        setAddMode(!isAddMode)
    }

    const toggleUpdateMode = () => {
        setUpdateMode(!isUpdateMode)
    }

    // 이벤트 핸들러
    const handleAddButtonCLick = () => {
        setInsertData({
            WorkId: -1,
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            tags: '',
        })

        setAddMode(true)
    }

    const handleUpdateClick = (data: ImageData) => {
        setInsertData({
            WorkId: data.workId!,
            title: data.title!,
            company: data.company!,
            startDate: data.startDate!,
            endDate: data.endDate!,
            tags: '',
        })
        console.log(data)
        setUpdateMode(true)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInsertData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0])
        }
    }

    const handleAddSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!addGallery || !selectedImage) return

        const { title, company, startDate, endDate, tags } = insertData
        const tagsArray = tags.split(',').map((tag) => tag.trim())

        const data: registWorkRequestDTO = {
            title,
            company,
            startDate,
            endDate,
            tags: tagsArray,
        }

        await addGallery(data, selectedImage)
        fetchGallery && fetchGallery()
        setAddMode(false)
    }

    const handleUpdateSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()
        if (!updateGallery) return

        const { title, company, startDate, endDate, tags } = insertData
        const tagsArray = tags.split(',').map((tag) => tag.trim())

        const data: modifyWorkRequestDTO = {
            title,
            company,
            startDate,
            endDate,
            tags: tagsArray,
        }

        await updateGallery(data, selectedImage)
        setUpdateMode(false)
    }

    const handleDelete = async (workId: number) => {
        if (!deleteGallery) return

        await deleteGallery(workId)
        setUpdateMode(false)
    }

    // 훅

    useEffect(() => {
        fetchGallery
    }, [isAddMode, isUpdateMode])

    const gridTemplateColumns = `repeat(${colCount}, 1fr)`

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns,
                gap: '10px',
                height: height,
                width: width,
            }}
        >
            {isEditMode && (
                <>
                    <div key={-2} className={styles.workContainer}>
                        <div
                            className={`${styles.titleContainer} ${isDarkMode ? styles.darkTitle : styles.lightTitle}`}
                        >
                            <div
                                className={styles.title}
                                style={{
                                    borderBottom: `1px solid ${isDarkMode ? 'white' : 'black'}`,
                                }}
                            >
                                새 타이틀
                            </div>
                            <div className={styles.content}>
                                오른쪽을 클릭하여 새 이미지를 추가하세요
                            </div>
                        </div>
                    </div>
                    <div
                        key={-1}
                        style={{
                            overflow: 'hidden',
                            width: '100%',
                            height: '300px',
                            border: '5px solid #808080',
                        }}
                        onClick={handleAddButtonCLick}
                    >
                        <img
                            src="/svgs/add_card.svg"
                            className={styles.addCard}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </>
            )}
            {images.map((image) => (
                <div
                    className={styles.workContainer}
                    key={image.workId ? image.workId : image.galleryId}
                >
                    {image.company && (
                        <div
                            className={`${styles.titleContainer} ${isDarkMode ? styles.darkTitle : styles.lightTitle}`}
                        >
                            {isEditMode && (
                                <img
                                    className={styles.deleteButton}
                                    src={'/svgs/edit_white.svg'}
                                    alt="Delete"
                                    onClick={() => handleUpdateClick(image)}
                                />
                            )}
                            <div
                                className={styles.title}
                                style={{
                                    borderBottom: `1px solid ${isDarkMode ? 'white' : 'black'}`,
                                }}
                            >
                                {image.title}
                            </div>
                            <div className={styles.content}>
                                {image.startDate} ~ {image.endDate}
                            </div>
                        </div>
                    )}
                    <img
                        src={image.thumbnail}
                        alt={image.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            ))}
            <Modal
                height="50%"
                width="40%"
                isVisible={isAddMode || isUpdateMode}
                toggleModal={isAddMode ? toggleAddMode : toggleUpdateMode}
            >
                <form
                    onSubmit={isAddMode ? handleAddSubmit : handleUpdateSubmit}
                >
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={insertData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <br></br>
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={insertData.company}
                        onChange={handleInputChange}
                        required
                    />
                    <br></br>
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={insertData.startDate}
                        onChange={handleInputChange}
                        required
                    />
                    <br></br>
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={insertData.endDate}
                        onChange={handleInputChange}
                        required
                    />
                    <br></br>
                    <label htmlFor="tags">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={insertData.tags}
                        onChange={handleInputChange}
                        required
                    />
                    <br></br>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={isAddMode}
                    />
                    <br></br>
                    <button type="submit">
                        {isAddMode ? 'Save' : 'Update'}
                    </button>
                    <br></br>
                    {isUpdateMode && (
                        <button
                            type="button"
                            onClick={() => handleDelete(insertData.WorkId!)}
                        >
                            Delete
                        </button>
                    )}
                </form>
            </Modal>
        </div>
    )
}

export default GridGallery
