import React from 'react'
import styles from './GridGallery.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'
import { BiLabel } from 'react-icons/bi'

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
}

const GridGallery: React.FC<GalleryProps> = ({
    images,
    colCount,
    width,
    height,
}) => {
    const gridTemplateColumns = `repeat(${colCount}, 1fr)`
    const { isDarkMode } = useDarkModeStore()

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
            {images.map((image) => (
                <div
                    key={image.workId ? image.workId : image.galleryId}
                    style={{
                        overflow: 'hidden',
                        width: '100%',
                        height: height,
                    }}
                >
                    {image.company && (
                        <div
                            className={`${styles.title} ${isDarkMode ? styles.darkTitle : styles.lightTitle}`}
                        >
                            <div
                                style={{
                                    fontSize: '40px',
                                    borderBottom: `1px solid ${isDarkMode ? 'white' : 'black'}`,
                                    marginBottom: '10px',
                                }}
                            >
                                {image.company}
                            </div>
                            <div>
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
