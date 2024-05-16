'use client'

import SupportCard from '@/component/SupportCard'
import useDarkModeStore from '@/utils/store/useThemaStore'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import styles from './support.module.scss'
import useEditModeStore from '@/utils/store/useEditModeStore'
import Modal from '@/component/layout/Modal'
import { getSupportList } from '@/utils/api/support'
import { supportDetailInfo } from '@/utils/api/DTO/support'

const components: { [key: string]: React.ComponentType<any> } = {
    artstation: dynamic(() => import('@/component/support/Artstation')),
    cafe: dynamic(() => import('@/component/support/Cafe')),
    instagram: dynamic(() => import('@/component/support/Instagram')),
    pixiv: dynamic(() => import('@/component/support/Pixiv')),
    x: dynamic(() => import('@/component/support/X')),
    youtube: dynamic(() => import('@/component/support/Youtube')),
}

interface Domain {
    key: string
    url: string
    text: string
}

const getDomains = (): Domain[] => {
    return [
        {
            key: 'artstation',
            url: 'https://www.artstation.com/yourprofile',
            text: 'ArtStation에서 제 작품들을 확인해보세요!',
        },
        {
            key: 'cafe',
            url: 'https://cafe.naver.com/yourcommunity',
            text: '네이버 카페에서 저와 함께 다양한 주제로 이야기해요!',
        },
        {
            key: 'instagram',
            url: 'https://www.instagram.com/yourusername',
            text: 'Instagram에서 제 일상과 작품들을 만나보세요!',
        },
        {
            key: 'pixiv',
            url: 'https://www.pixiv.net/users/yourid',
            text: 'Pixiv에서 제 그림들을 감상하실 수 있습니다!',
        },
        {
            key: 'x',
            url: 'https://www.x.com/yourprofile',
            text: 'X에서 실시간으로 저와 소통할 수 있어요!',
        },
        {
            key: 'youtube',
            url: 'https://www.youtube.com/c/yourchannel',
            text: 'YouTube에서 제 콘텐츠를 구독하고 최신 비디오를 확인하세요!',
        },
    ]
}

const SupportPage: React.FC = () => {
    const domains = getDomains()
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    const [addMode, setAddMode] = useState(false)
    const [supportData, setSupportData] = useState<supportDetailInfo[]>([])
    const [tempNumForSupportEffect, setTempNumForSupportEffect] =
        useState<number>(0)

    const toggleAddMode = () => {
        setAddMode((prev) => !prev)
    }

    const fetchSupport = async () => {
        const response = await getSupportList()
        return response.data
    }

    useEffect(() => {
        fetchSupport().then((data) => {
            setSupportData(data)
        })
    }, [tempNumForSupportEffect])

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <div className={styles.container}>
                <div
                    className={`${styles.banner} ${isDarkMode ? styles.darkBanner : styles.lightBanner}`}
                >
                    <div style={{ fontSize: '46px' }}>서포트</div>
                    <br></br>
                    <h3 style={{ fontSize: '16px' }}>
                        작품의 구매 정보나, 작가를 후원할 수 있는 링크들 입니다.
                    </h3>
                </div>

                <SupportCard
                    items={supportData}
                    addTogle={() => {}}
                    isEditMode={isEditMode}
                    isDarkMode={isDarkMode}
                    tempNumForSupportEffect={tempNumForSupportEffect}
                    setTempNumForSupportEffect={setTempNumForSupportEffect}
                />
            </div>

            <Modal
                isVisible={addMode}
                toggleModal={toggleAddMode}
                width="60vw"
                height="60vh"
            >
                <div></div>
            </Modal>
        </article>
    )
}

export default SupportPage
