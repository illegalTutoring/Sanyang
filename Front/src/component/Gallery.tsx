import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import styles from './Gallery.module.scss'

export interface ImageData {
    id: number
    url: string
    title: string
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
                <div key={image.id} className={styles.item}>
                    <img
                        src={image.url}
                        alt={image.title}
                        style={{
                            width: '100%',
                            objectFit: 'cover',
                        }}
                        className={styles.card}
                    />
                </div>
            ))}
        </Masonry>
    )
}

export default Gallery
