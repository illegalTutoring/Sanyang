import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import styles from './Gallery.module.scss'

export interface ImageData {
    workId?: number
    galleryId?: number
    userId: string
    title: string
    company?: string
    startDate: string
    endDate: string
    uploadDate: string
    tags: string[]
    original: string
    thumbnail: string
}

export interface GalleryProps {
    images: ImageData[]
    colCount: number
    width?: string
    height?: string
    isEditMode: boolean
    addTogle: () => void
}

const Gallery: React.FC<GalleryProps> = ({
    images,
    colCount,
    isEditMode,
    addTogle,
}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const breakpointColumnsObj = {
        default: colCount,
        1100: colCount > 3 ? 3 : colCount,
        700: colCount > 2 ? 2 : colCount,
        500: 1,
    }

    const handleImageClick = (image: string) => {
        setSelectedImage(image)
    }

    const handleClose = () => {
        setSelectedImage(null)
    }

    const handleRightClick = (event: React.MouseEvent) => {
        event.preventDefault()
    }

    return (
        <div>
            {selectedImage && (
                <div
                    className={styles.galleryModal}
                    onClick={handleClose}
                    onContextMenu={handleRightClick}
                >
                    <img src={selectedImage} className={styles.expandedImg} />
                </div>
            )}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={styles.list}
                columnClassName={styles.column}
            >
                {isEditMode && (
                    <div key={-1} className={styles.column} onClick={addTogle}>
                        <div className={styles.card}>
                            <img
                                src={'/svgs/add.svg'}
                                alt={'addButton'}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>
                )}
                {images.map((image) => (
                    <div
                        key={image.workId ? image.workId : image.galleryId}
                        className={styles.column}
                        onClick={() => handleImageClick(image.original)}
                    >
                        <div className={styles.card}>
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
                    </div>
                ))}
            </Masonry>
        </div>
    )
}

export default Gallery
