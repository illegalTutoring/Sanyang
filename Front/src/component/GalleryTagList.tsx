import React from 'react'
import styles from './GalleryTagList.module.scss'

interface TagListProps {
    tags: string[]
    galleryId: number
    handleScroll: (index: number, direction: string) => void
    isDarkMode: boolean
}

const GalleryTagList: React.FC<TagListProps> = ({
    tags,
    galleryId,
    handleScroll,
    isDarkMode,
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
                    src={`${isDarkMode ? 'svgs/arrow_left_white.svg' : 'svgs/arrow_left_black.svg'}`}
                    alt="Scroll Left"
                />
            </div>
            <div className={styles.tagBoxWrapper} style={{ width: '100%' }}>
                <div id={`tag-box-${galleryId}`} className={styles.tagBox}>
                    {tags.map((tag, idx) => (
                        <div
                            key={idx}
                            className={`${styles.tag} ${isDarkMode ? styles.tagDark : styles.tagWhite}`}
                        >
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
                    src={`${isDarkMode ? 'svgs/arrow_right_white.svg' : 'svgs/arrow_right_black.svg'}`}
                    alt="Scroll Right"
                />
            </div>
        </div>
    )
}

export default GalleryTagList
