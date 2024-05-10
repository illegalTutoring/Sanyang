'use client'

import React, { useEffect, useState } from 'react'
import styles from './gallery.module.scss'
import Gallery from '@/component/Gallery'
import TagInput from '@/component/TagInput'
import Modal from '@/component/layout/Modal'
import GridGallery from '@/component/GridGallery'
import useDarkModeStore from '@/utils/store/useThemaStore'
import { getGalleryList } from '@/utils/api/gallery'
import useEditModeStore from '@/utils/store/useEditModeStore'

let defaultImages = getGalleryList().data
if (!defaultImages) {
    /**
     * @todo 이미지가 존재하지 않을 때 예외 처리
     */

    defaultImages = [
        {
            galleryId: 0,
            userId: '',
            title: '이미지가 존재하지 않습니다.',
            startDate: '',
            endDate: '',
            uploadDate: '',
            tags: [
                'apple',
                'alalal',
                'apricot',
                'avocado',
                'acai',
                'acerola',
                'anchovy',
                'antelope',
                'ant',
                'anaconda',
                'asteroid',
                'avenue',
                'answer',
            ],
            original: 'https://placehold.co/600x400',
            thumbnail: 'https://placehold.co/600x400',
        },
        {
            galleryId: 1,
            userId: '',
            title: '이미지가 존재하지 않습니다.',
            startDate: '',
            endDate: '',
            uploadDate: '',
            tags: [
                'apple',
                'alalal',
                'apricot',
                'avocado',
                'acai',
                'acerola',
                'anchovy',
                'antelope',
                'ant',
                'anaconda',
                'asteroid',
                'avenue',
                'answer',
            ],
            original: 'https://placehold.co/900x400',
            thumbnail: 'https://placehold.co/900x400',
        },
        {
            galleryId: 2,
            userId: '',
            title: '이미지가 존재하지 않습니다.',
            startDate: '',
            endDate: '',
            uploadDate: '',
            tags: [
                'apple',
                'alalal',
                'apricot',
                'avocado',
                'acai',
                'acerola',
                'anchovy',
                'antelope',
                'ant',
                'anaconda',
                'asteroid',
                'avenue',
                'answer',
            ],
            original: 'https://placehold.co/900x1200',
            thumbnail: 'https://placehold.co/900x1200',
        },
        {
            galleryId: 3,
            userId: '',
            title: '이미지가 존재하지 않습니다.',
            startDate: '',
            endDate: '',
            uploadDate: '',
            tags: [
                'apple',
                'alalal',
                'apricot',
                'avocado',
                'acai',
                'acerola',
                'anchovy',
                'antelope',
                'ant',
                'anaconda',
                'asteroid',
                'avenue',
                'answer',
            ],
            original: 'https://placehold.co/600x1100',
            thumbnail: 'https://placehold.co/600x1100',
        },
        {
            galleryId: 4,
            userId: '',
            title: '이미지가 존재하지 않습니다.',
            startDate: '',
            endDate: '',
            uploadDate: '',
            tags: [
                'apple',
                'alalal',
                'apricot',
                'avocado',
                'acai',
                'acerola',
                'anchovy',
                'antelope',
                'ant',
                'anaconda',
                'asteroid',
                'avenue',
                'answer',
            ],
            original: 'https://placehold.co/350X750',
            thumbnail: 'https://placehold.co/350X750',
        },
        {
            galleryId: 5,
            userId: '',
            title: '이미지가 존재하지 않습니다.',
            startDate: '',
            endDate: '',
            uploadDate: '',
            tags: [
                'apple',
                'alalal',
                'apricot',
                'avocado',
                'acai',
                'acerola',
                'anchovy',
                'antelope',
                'ant',
                'anaconda',
                'asteroid',
                'avenue',
                'answer',
            ],
            original: 'https://placehold.co/350X650',
            thumbnail: 'https://placehold.co/350X650',
        },
    ]
}
console.log(defaultImages)
/**
 * @todo Error Handling
 */

const GalleryPage = () => {
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    // const defaultImages = [
    //     {
    //         galleryId: 1,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/GEh332ebYAAwJxD?format=png&name=900x900',
    //     },
    //     {
    //         galleryId: 2,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/FhdMW1daAAEtiR8?format=jpg&name=large',
    //     },
    //     {
    //         galleryId: 3,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/GEh332ebYAAwJxD?format=png&name=900x900',
    //     },
    //     {
    //         galleryId: 4,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/FhdMW1daAAEtiR8?format=jpg&name=large',
    //     },
    //     {
    //         galleryId: 5,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/GEh332ebYAAwJxD?format=png&name=900x900',
    //     },
    //     {
    //         galleryId: 6,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=large',
    //     },
    //     {
    //         galleryId: 7,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/Ff2H_LQaEAE5Pi_?format=jpg&name=4096x4096',
    //     },
    //     {
    //         galleryId: 8,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/Fenjik9aMAA-oYi?format=jpg&name=small',
    //     },
    // ]

    const defaultImages2 = defaultImages.slice(0, 4)

    const tags = [
        'apple',
        'alalal',
        'apricot',
        'avocado',
        'acai',
        'acerola',
        'anchovy',
        'antelope',
        'ant',
        'anaconda',
        'asteroid',
        'avenue',
        'answer',
        'astronomy',
        'algebra',
        'artifact',
        'alchemy',
        'angle',
        'argyle',
        'ascot',
        'artifact',
        'aviation',
        'aviary',
        'axis',
    ]

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
                        images={defaultImages2}
                        width={'100%'}
                        height={'300px'}
                        colCount={defaultImages2.length}
                        isDarkMode={isDarkMode}
                    />
                </div>
            </div>

            <div
                className={`${styles.box} ${isDarkMode ? styles.darkBox : styles.lightBox}`}
            ></div>

            <div>
                <Gallery
                    images={defaultImages}
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
                    height: isModalOpen ? '190px' : '0',
                }}
            >
                <div className={styles.modalContent}>
                    <TagInput availableTags={tags} />
                </div>
            </div>
        </div>
    )
}

export default GalleryPage
