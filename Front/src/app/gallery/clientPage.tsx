'use client'

import React, { useEffect, useState } from 'react'
import styles from './gallery.module.scss'
import Gallery from '@/component/Gallery'
import TagInput from '@/component/TagInput'
import Modal from '@/component/layout/Modal'
import GridGallery from '@/component/GridGallery'
import useDarkModeStore from '@/utils/store/useThemaStore'
import { getGalleryList, getGalleryListByTag } from '@/utils/api/gallery'
import useEditModeStore from '@/utils/store/useEditModeStore'
import { galleryInfo } from '@/utils/api/DTO/gallery'

/**
 * @todo Error Handling
 */

interface ClientPageProps {
    propsImages: galleryInfo[]
}

const ClientPage: React.FC<ClientPageProps> = ({ propsImages }) => {
    const [images, setImages] = useState<galleryInfo[]>(propsImages || [])
    const [images2, setImages2] = useState<galleryInfo[]>(propsImages || [])
    const [tagList, setTagList] = useState<string[]>([])

    const makeTagList = (arr: galleryInfo[]) => {
        let tagSet = new Set<string>()
        arr.forEach((el) => {
            el.tags.forEach((tag) => {
                tagSet.add(tag)
            })
        })

        return Array.from(tagSet).sort()
    }
    const fetchGallery = async () => {
        const response = await getGalleryList()
        setImages(response.data)
        setImages2(images.slice(0, 4))
        setTagList(makeTagList(images))
    }

    const fetchGalleryByTag = async (selectedTags: string[]) => {
        const response = await getGalleryListByTag(selectedTags)
        setImages(response.data)
        setImages2(images.slice(0, 4))
        setTagList(makeTagList(images))
    }

    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    const [isGalleryVisible, setIsGalleryVisible] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [btnText, setBtnText] = useState('태그검색')
    const [addMode, setAddMode] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const toggleAddMode = () => {
        setAddMode((prev) => !prev)
    }

    const toggleGallery = () => {
        setIsGalleryVisible((prev) => !prev)
    }

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev)

        btnText === '태그검색' ? setBtnText('검색하기') : setBtnText('태그검색')
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setPreviewUrl(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className={`${styles.container} ${isDarkMode ? 'dark' : 'light'}`}>
            <div
                className={`${isDarkMode ? styles.darkGalleryWrapper : styles.lightGalleryWrapper}`}
            >
                <div className={`${styles.gridGalleryHeader}`}>
                    <div style={{ fontSize: '25px' }}>최신 업데이트</div>
                    <div onClick={toggleGallery}>
                        <img
                            className={`${isGalleryVisible ? styles.rotate180 : styles.rotate360}`}
                            style={{ width: '25px' }}
                            src={`${isDarkMode ? '/svgs/double_down_white.svg' : '/svgs/double_down_black.svg'}`}
                            alt=""
                        />
                    </div>
                </div>
                <div
                    style={{ height: isGalleryVisible ? '300px' : '0' }}
                    className={styles.galleryContainer}
                >
                    <GridGallery
                        images={images2}
                        width={'100%'}
                        height={'300px'}
                        colCount={images2.length}
                        isDarkMode={isDarkMode}
                    />
                </div>
            </div>

            <div
                className={`${styles.box} ${isDarkMode ? styles.darkBox : styles.lightBox}`}
            ></div>

            <div>
                <Gallery
                    images={images}
                    colCount={4}
                    isEditMode={isEditMode}
                    addTogle={() => {
                        toggleAddMode()
                    }}
                    isDarkMode={isDarkMode}
                />
            </div>

            <Modal
                isVisible={addMode}
                toggleModal={toggleAddMode}
                width="60vw"
                height="60vh"
            >
                <div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Image Preview"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    )}
                </div>
            </Modal>

            <div
                id="searchButton"
                className={styles.searchButton}
                style={{
                    width: isModalOpen ? '300px' : '120px',
                }}
                onClick={toggleModal}
            >
                <img src="/svgs/magnifier_white.svg" alt="" />
                {btnText}
            </div>

            <div
                className={styles.modalBackdrop}
                style={{
                    height: isModalOpen ? 'auto' : '0',
                }}
            >
                <div className={styles.modalContent}>
                    <TagInput availableTags={tagList} />
                </div>
            </div>
        </div>
    )
}

export default ClientPage
