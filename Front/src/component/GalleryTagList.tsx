import React from 'react'
import styles from './GalleryTagList.module.scss'

interface TagListProps {
    tags: string[]
    galleryId: number
    handleScroll: (index: number, direction: string) => void
    isDarkMode: boolean
    selectedTags: string[]
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
    tempNumForTagsEffect: number
    setTempNumForTagsEffect: React.Dispatch<React.SetStateAction<number>>
}

const GalleryTagList: React.FC<TagListProps> = ({
    tags,
    galleryId,
    handleScroll,
    isDarkMode,
    selectedTags,
    setSelectedTags,
    tempNumForTagsEffect,
    setTempNumForTagsEffect,
}) => {
    const toggleTag = (tag: string) => {
        let updatedTags: string[]
        if (selectedTags.includes(tag)) {
            updatedTags = selectedTags.filter((t) => t !== tag)
        } else {
            updatedTags = [...selectedTags, tag]
        }
        setSelectedTags(updatedTags)
        setTempNumForTagsEffect(tempNumForTagsEffect + 1)
    }

    return (
        <div className={styles.tagList}>
            <div
                className={styles.scrollBtnLeft}
                id={`scroll-btn-left-${galleryId}`}
                onClick={() => handleScroll(galleryId, 'left')}
            >
                <img
                    width="10px"
                    src={`${isDarkMode ? '/svgs/arrow_left_white.svg' : '/svgs/arrow_left_black.svg'}`}
                    alt="Scroll Left"
                />
            </div>
            <div className={styles.tagBoxWrapper} style={{ width: '100%' }}>
                <div id={`tag-box-${galleryId}`} className={styles.tagBox}>
                    {tags.map((tag, idx) => (
                        <div
                            key={idx}
                            className={`${styles.tag} ${isDarkMode ? styles.tagDark : styles.tagWhite} ${selectedTags.includes(tag) ? styles.tagSelected : ''}`}
                            onClick={() => toggleTag(tag)}
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
                    src={`${isDarkMode ? '/svgs/arrow_right_white.svg' : '/svgs/arrow_right_black.svg'}`}
                    alt="Scroll Right"
                />
            </div>
        </div>
    )
}

export default GalleryTagList
