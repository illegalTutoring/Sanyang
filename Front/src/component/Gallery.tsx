'use client'

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
    isDarkMode: boolean
    addTogle: () => void
    tags: string[]
    setTags: React.Dispatch<React.SetStateAction<string[]>>
    tempNumForTagsEffect: number
    setTempNumForTagsEffect: React.Dispatch<React.SetStateAction<number>>
    deleteGallery: (id: number) => void
}

const Gallery: React.FC<GalleryProps> = ({
    images,
    colCount,
    isEditMode,
    isDarkMode,
    addTogle,
    tags,
    setTags,
    tempNumForTagsEffect,
    setTempNumForTagsEffect,
    deleteGallery,
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

    const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        setScale(1)
        setPosition({ x: 0, y: 0 })
        setStartPosition({ x: 0, y: 0 })
        setSelectedImage(null)
    }

    const handleOpenImage = (event: React.MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
    }

    const deleteImage = (id: number, event: React.MouseEvent) => {
        event.stopPropagation()

        deleteGallery(id)
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

    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [dragging, setDragging] = useState(false)
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (!dragging) {
            setDragging(true)
            setStartPosition({
                x: event.clientX - position.x,
                y: event.clientY - position.y,
            })
        } else {
            setDragging(false)
        }
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (dragging) {
            event.preventDefault()
            setPosition({
                x: event.clientX - startPosition.x,
                y: event.clientY - startPosition.y,
            })
        }
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        setDragging(false)
    }

    const handleImageWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (event.deltaY > 0) {
            setScale((prevScale) => Math.max(prevScale - 0.1, 1))
        } else {
            setScale((prevScale) => Math.min(prevScale + 0.1, 3))
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
                <div className={styles.galleryModalOverlay}>
                    <div
                        style={{ color: 'white' }}
                        className={styles.closeButton}
                        onClick={handleClose}
                    >
                        닫기
                        <img src="svgs/delete.svg" alt="Close" />
                    </div>
                    <div className={styles.galleryModal}>
                        <img
                            onContextMenu={handleOpenImage}
                            onWheel={handleImageWheel}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            src={selectedImage}
                            className={styles.expandedImg}
                            style={{
                                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                                cursor: dragging ? 'grabbing' : 'grab',
                            }}
                        />
                    </div>
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
                            isDarkMode={isDarkMode}
                            selectedTags={tags}
                            setSelectedTags={setTags}
                            tempNumForTagsEffect={tempNumForTagsEffect}
                            setTempNumForTagsEffect={setTempNumForTagsEffect}
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    )
}

export default Gallery
