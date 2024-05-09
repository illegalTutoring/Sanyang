import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import styles from './Gallery.module.scss'
import { galleryInfo } from '@/utils/api/DTO/gallery'
import GalleryTagList from './GalleryTagList'

export interface GalleryProps {
    images: galleryInfo[]
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
    const [newColCount, setNewColCount] = useState(colCount)

    const updateColCount = () => {
        const width = window.innerWidth
        let newColCount = colCount

        if (width <= 500) newColCount = 1
        else if (width <= 700) newColCount = colCount > 2 ? 2 : colCount
        else if (width <= 1100) newColCount = colCount > 3 ? 3 : colCount

        setNewColCount(newColCount)
    }

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

    const handleOpenImage = (event: React.MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
    }

    const deleteImage = (id: number, event: React.MouseEvent) => {
        event.stopPropagation()
        console.log('delete image', id)
    }

    const handleScroll = (index: number, direction: string) => {
        const tagBox = document.querySelector(`#tag-box-${index}`)
        if (tagBox) {
            if (direction === 'left') {
                tagBox.scrollLeft -= 200
            } else {
                tagBox.scrollLeft += 200
            }
        }
    }

    useEffect(() => {
        window.addEventListener('resize', updateColCount)

        images.forEach((image) => {
            const leftBtn = document.querySelector(
                `#scroll-btn-left-${image.galleryId}`,
            )
            const rightBtn = document.querySelector(
                `#scroll-btn-right-${image.galleryId}`,
            )

            if (leftBtn && rightBtn) {
                leftBtn.addEventListener('click', () =>
                    handleScroll(image.galleryId, 'left'),
                )
                rightBtn.addEventListener('click', () =>
                    handleScroll(image.galleryId, 'right'),
                )
            }
        })

        return () => {
            images.forEach((image) => {
                const leftBtn = document.querySelector(
                    `#scroll-btn-left-${image.galleryId}`,
                )
                const rightBtn = document.querySelector(
                    `#scroll-btn-right-${image.galleryId}`,
                )

                if (leftBtn && rightBtn) {
                    leftBtn.removeEventListener('click', () =>
                        handleScroll(image.galleryId, 'left'),
                    )
                    rightBtn.removeEventListener('click', () =>
                        handleScroll(image.galleryId, 'right'),
                    )
                }
            })
            window.removeEventListener('resize', updateColCount)
        }
    }, [images, newColCount])

    return (
        <div>
            {selectedImage && (
                <div
                    className={styles.galleryModal}
                    onClick={handleClose}
                    onContextMenu={handleOpenImage}
                >
                    <img src={selectedImage} className={styles.expandedImg} />
                </div>
            )}
            <Masonry
                breakpointCols={newColCount}
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
                        key={image.galleryId}
                        className={`${styles.column} galleryImage`}
                    >
                        <div
                            className={styles.card}
                            onClick={() => handleImageClick(image.original)}
                        >
                            {isEditMode && (
                                <img
                                    className={styles.deleteButton}
                                    src={'/svgs/delete_red.svg'}
                                    alt="Delete"
                                    onClick={(event) =>
                                        deleteImage(image.galleryId, event)
                                    }
                                />
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
                        <GalleryTagList
                            tags={image.tags}
                            galleryId={image.galleryId}
                            handleScroll={handleScroll}
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    )
}

export default Gallery
