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
import { registSupport, modifySupport, deleteSupport } from '@/utils/api/admin'

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
    link: string
    text: string
}

const getDomains = (): Domain[] => {
    return [
        {
            key: 'artstation',
            link: 'https://www.artstation.com/yourprofile',
            text: 'ArtStation에서 제 작품들을 확인해보세요!',
        },
        {
            key: 'cafe',
            link: 'https://cafe.naver.com/yourcommunity',
            text: '네이버 카페에서 저와 함께 다양한 주제로 이야기해요!',
        },
        {
            key: 'instagram',
            link: 'https://www.instagram.com/yourusername',
            text: 'Instagram에서 제 일상과 작품들을 만나보세요!',
        },
        {
            key: 'pixiv',
            link: 'https://www.pixiv.net/users/yourid',
            text: 'Pixiv에서 제 그림들을 감상하실 수 있습니다!',
        },
        {
            key: 'x',
            link: 'https://www.x.com/yourprofile',
            text: 'X에서 실시간으로 저와 소통할 수 있어요!',
        },
        {
            key: 'youtube',
            link: 'https://www.youtube.com/c/yourchannel',
            text: 'YouTube에서 제 콘텐츠를 구독하고 최신 비디오를 확인하세요!',
        },
    ]
}

export interface registSupportRequestDTO {
    title: string
    uploadDate: string
    supportLink: Array<{ link: string; name: string }>
    content: string
}

const SupportPage: React.FC = () => {
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    const [addMode, setAddMode] = useState(false)
    const [supportData, setSupportData] = useState<supportDetailInfo[]>([])
    const [formData, setFormData] = useState<registSupportRequestDTO>({
        title: '',
        uploadDate: '',
        supportLink: [{ link: '', name: '' }],
        content: '',
    })
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const toggleAddMode = () => {
        setAddMode((prev) => !prev)
    }

    const fetchSupport = async () => {
        const response = await getSupportList()

        console.log(response.data)

        setSupportData(response.data)
    }

    useEffect(() => {
        fetchSupport()
    }, [addMode])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number,
    ) => {
        const { name, value } = e.target
        if (index !== undefined) {
            const updatedSupportLink = [...formData.supportLink]
            updatedSupportLink[index] = {
                ...updatedSupportLink[index],
                [name]: value,
            }
            setFormData({ ...formData, supportLink: updatedSupportLink })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleAddSupportLink = () => {
        setFormData({
            ...formData,
            supportLink: [...formData.supportLink, { link: '', name: '' }],
        })
    }

    const handleRemoveSupportLink = (index: number) => {
        const updatedSupportLink = formData.supportLink.filter(
            (_, i) => i !== index,
        )
        setFormData({ ...formData, supportLink: updatedSupportLink })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data: registSupportRequestDTO = {
            title: formData.title,
            uploadDate: formData.uploadDate,
            supportLink: formData.supportLink,
            content: formData.content,
        }

        if (!selectedFile) return

        await registSupport(data, selectedFile)
        toggleAddMode()
    }

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
                    addTogle={toggleAddMode}
                    isEditMode={isEditMode}
                    isDarkMode={isDarkMode}
                />
            </div>

            <Modal
                isVisible={addMode}
                toggleModal={toggleAddMode}
                width="60vw"
                height="60vh"
            >
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} required />
                    <br></br>
                    <label>
                        제목:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br></br>
                    <label>
                        업로드 날짜:
                        <input
                            type="date"
                            name="uploadDate"
                            value={formData.uploadDate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br></br>
                    {formData.supportLink.map((link, index) => (
                        <div key={index}>
                            <label>
                                이름:
                                <input
                                    type="text"
                                    name="name"
                                    value={link.name}
                                    onChange={(e) =>
                                        handleInputChange(e, index)
                                    }
                                    required
                                />
                            </label>
                            <label>
                                지원 링크 link:
                                <input
                                    type="url"
                                    name="link"
                                    value={link.link}
                                    onChange={(e) =>
                                        handleInputChange(e, index)
                                    }
                                    required
                                />
                            </label>
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemoveSupportLink(index)
                                    }
                                >
                                    링크 제거
                                </button>
                            )}
                        </div>
                    ))}

                    <button type="button" onClick={handleAddSupportLink}>
                        링크 추가
                    </button>

                    <br></br>
                    <label>
                        내용:
                        <br></br>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <br></br>
                    <button type="submit">제출</button>
                </form>
            </Modal>
        </article>
    )
}

export default SupportPage
