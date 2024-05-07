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
    watermark: string
}

export interface GalleryProps {
    images: ImageData[]
    colCount: number
    width?: string
    height?: string
}

const Gallery: React.FC<GalleryProps> = ({ images, colCount }) => {
    const breakpointColumnsObj = {
        default: colCount,
        1100: colCount > 3 ? 3 : colCount,
        700: colCount > 2 ? 2 : colCount,
        500: 1,
    }

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.list}
            columnClassName={styles.column}
        >
            {images.map((image) => (
                <div
                    key={image.workId ? image.workId : image.galleryId}
                    className={styles.column}
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
    )
}

export default Gallery
