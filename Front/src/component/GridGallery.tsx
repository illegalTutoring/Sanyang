import React from 'react'
import styles from './GridGallery.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'
import { BiLabel } from 'react-icons/bi'
import useEditModeStore from '@/utils/store/useEditModeStore'

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
}

const GridGallery: React.FC<GalleryProps> = ({
    images,
    colCount,
    width,
    height,
    isEditMode = false,
    isDarkMode = false,
}) => {
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
                                    src={'/svgs/delete_red.svg'}
                                    alt="Delete"
                                    // onClick={(event) =>
                                    // }
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
        </div>
    )
}

export default GridGallery
