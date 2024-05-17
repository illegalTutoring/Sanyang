'use client'

import React, { useEffect, useState } from 'react'
import styles from './gallery.module.scss'

// Components
import Gallery from '@/component/Gallery'
import TagInput from '@/component/TagInput'
import Modal from '@/component/layout/Modal'
import GridGallery from '@/component/GridGallery'
import SimpleTagInput from '@/component/SimpleTagInput'

// Store
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore'

// API
import { getGalleryList } from '@/utils/api/gallery'
import { registGallery, deleteGallery } from '@/utils/api/admin'

// DTO
import { galleryInfo } from '@/utils/api/DTO/gallery'

/**
 * @todo Error Handling
 */

interface ClientPageProps {
    propsImages: galleryInfo[]
}

export const makeTagListByImages = (arr: galleryInfo[]) => {
    let tagSet = new Set<string>()
    arr.forEach((el) => {
        el.tags.forEach((tag) => {
            tagSet.add(tag)
        })
    })

    return Array.from(tagSet).sort()
}

const ClientPage: React.FC<ClientPageProps> = ({ propsImages }) => {
    // 전역변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    // 지역변수
    const [images, setImages] = useState<galleryInfo[]>(propsImages || [])
    const [images2, setImages2] = useState<galleryInfo[]>(
        propsImages.slice(0, 4) || [],
    )
    const [tagList, setTagList] = useState<string[]>(
        makeTagListByImages(propsImages),
    )
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [tempNumForTagsEffect, setTempNumForTagsEffect] = useState<number>(0)
    const [isGalleryVisible, setIsGalleryVisible] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [btnText, setBtnText] = useState('태그검색')
    const [addMode, setAddMode] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [newTags, setNewTags] = useState<string[]>([])
    const [file, setFile] = useState<File | null>(null)

    // 훅
    /**
     * @todo
     * temp__ 변수는 Tags의 useEffect Trigger를 위해 임시로 설정했다.
     * tags의 deep compare를 통해 useEffect를 Trigger할 수 있게 수정 후 삭제 요망
     */
    useEffect(() => {
        fetchGallery()
        setImages(
            selectedTags.length > 0
                ? propsImages.filter((image) => {
                      let flag: boolean = true
                      selectedTags.forEach((tag) => {
                          if (!image.tags.includes(tag)) flag = false
                      })
                      return flag
                  })
                : propsImages,
        )
        setImages2(images.slice(0, 4))
    }, [tempNumForTagsEffect])

    // 토글 함수
    const toggleAddMode = () => {
        setAddMode((prev) => !prev)
    }

    const toggleGallery = () => {
        setIsGalleryVisible((prev) => !prev)
    }

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev)

        btnText === '태그검색' ? setBtnText('닫기') : setBtnText('태그검색')
    }

    // 함수
    const fetchGallery = async () => {
        const response = await getGalleryList()
        setImages(response.data)
        setImages2(response.data.slice(0, 4))
        setTagList(makeTagListByImages(response.data))
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setFile(file)
            const reader = new FileReader()
            reader.onload = () => setPreviewUrl(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    interface registGalleryRequestDTO {
        title: string
        createDate: string
        tags: Array<string>
    }

    const handleSubmit = async () => {
        if (!file) {
            alert('이미지를 선택해주세요.')
            return
        }

        const newGallery: registGalleryRequestDTO = {
            title: 'New Gallery Item', // 필요한 필드를 채워 넣으세요
            createDate: new Date().toISOString(),
            tags: newTags,
        }

        try {
            const response = await registGallery(newGallery, file)
            if (response.message) {
                fetchGallery()
                setAddMode(false)
                setPreviewUrl(null)
                setNewTags([])
                setFile(null)
            }
        } catch (error) {
            console.error('갤러리 등록 중 에러 발생:', error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteGallery(id)
            setImages((images) =>
                images.filter((image) => image.galleryId !== id),
            )
        } catch (error) {
            console.error('갤러리 삭제 중 에러 발생:', error)
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
                        images={propsImages.slice(0, 4)}
                        width={'100%'}
                        height={'300px'}
                        colCount={propsImages.slice(0, 4).length}
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
                    tags={selectedTags}
                    setTags={setSelectedTags}
                    tempNumForTagsEffect={tempNumForTagsEffect}
                    setTempNumForTagsEffect={setTempNumForTagsEffect}
                    deleteGallery={handleDelete}
                />
            </div>

            <Modal
                isVisible={addMode}
                toggleModal={toggleAddMode}
                width="fit-content"
                height="fit-content"
            >
                <div className={styles.galleryModalContainer}>
                    <div
                        className={styles.galleryModalFileInput}
                        style={{
                            background: isDarkMode
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <img
                            src={`${isDarkMode ? '/svgs/image_plus_white.svg' : '/svgs/image_plus_black.svg'}`}
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>

                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Image Preview"
                            style={{ width: '300px', height: 'auto' }}
                        />
                    ) : (
                        <>
                            <div className={styles.defaultImg}>
                                <img src="svgs/add_card.svg"></img>
                            </div>
                        </>
                    )}
                    <SimpleTagInput tags={newTags} setTags={setNewTags} />

                    <div className={styles.galleryModalButton}>
                        <button
                            className={styles.blueButton}
                            onClick={handleSubmit}
                        >
                            업로드
                        </button>
                    </div>
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
                    <TagInput
                        availableTags={tagList}
                        tags={selectedTags}
                        setTags={setSelectedTags}
                        tempNumForTagsEffect={tempNumForTagsEffect}
                        setTempNumForTagsEffect={setTempNumForTagsEffect}
                    />
                </div>
            </div>
        </div>
    )
}

export default ClientPage
