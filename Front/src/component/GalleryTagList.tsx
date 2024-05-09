import React from 'react'
import styles from './Gallery.module.scss'

interface TagListProps {
    tags: string[]
    galleryId: number
    handleScroll: (index: number, direction: string) => void
}

const GalleryTagList: React.FC<TagListProps> = ({
    tags,
    galleryId,
    handleScroll,
}) => {
    return (
        <div className={styles.tagList}>
            <div
                className={styles.scrollBtnLeft}
                id={`scroll-btn-left-${galleryId}`}
                onClick={() => handleScroll(galleryId, 'left')}
            >
                <img
                    width="10px"
                    src="svgs/arrow_left_black.svg"
                    alt="Scroll Left"
                />
            </div>
            <div className={styles.tagBoxWrapper} style={{ width: '100%' }}>
                <div id={`tag-box-${galleryId}`} className={styles.tagBox}>
                    {tags.map((tag, idx) => (
                        <div key={idx} className={styles.tag}>
                            #{tag}
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={styles.scrollBtnRight}
                id={`scroll-btn-right-${galleryId}`}
                onClick={() => handleScroll(galleryId, 'right')}
            >
                <img
                    width="10px"
                    src="svgs/arrow_right_black.svg"
                    alt="Scroll Right"
                />
            </div>
        </div>
    )
}

export default GalleryTagList
