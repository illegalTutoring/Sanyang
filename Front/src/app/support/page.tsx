'use client'

import SupportCard from '@/component/SupportCard'
import useDarkModeStore from '@/utils/store/useThemaStore'
import React, { useEffect, useState } from 'react'
import styles from './support.module.scss'
import useEditModeStore from '@/utils/store/useEditModeStore'
import Modal from '@/component/layout/Modal'
import { getSupportList } from '@/utils/api/support'
import {
    modifySupportRequestDTO,
    supportDetailInfo,
} from '@/utils/api/DTO/support'
import { registSupport, modifySupport, deleteSupport } from '@/utils/api/admin'

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
    const [updateMode, setUpdateMode] = useState(false)
    const [supportData, setSupportData] = useState<supportDetailInfo[]>([])
    const [addFormData, setAddFormData] = useState<registSupportRequestDTO>({
        title: '',
        uploadDate: '',
        supportLink: [{ link: '', name: '' }],
        content: '',
    })

    const [modifyFormData, setModifyFormData] =
        useState<modifySupportRequestDTO>({
            supportId: -1,
            title: '',
            supportLink: [{ link: '', name: '' }],
            content: '',
        })

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const toggleAddMode = () => {
        setAddMode((prev) => !prev)
    }

    const toggleUpdateMode = () => {
        setUpdateMode((prev) => !prev)
    }

    const fetchSupport = async () => {
        const response = await getSupportList()

        console.log(response.data)

        setSupportData(response.data)
    }

    const fetchFormData = async (item: modifySupportRequestDTO) => {
        setModifyFormData(item)
    }

    useEffect(() => {
        fetchSupport()
    }, [addMode, updateMode])

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
            const updatedSupportLink = [...addFormData.supportLink]
            updatedSupportLink[index] = {
                ...updatedSupportLink[index],
                [name]: value,
            }
            setAddFormData({ ...addFormData, supportLink: updatedSupportLink })
        } else {
            setAddFormData({ ...addFormData, [name]: value })
        }
    }

    const handleUpdateChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number,
    ) => {
        const { name, value } = e.target
        if (index !== undefined) {
            const updatedSupportLink = [...modifyFormData.supportLink]
            updatedSupportLink[index] = {
                ...updatedSupportLink[index],
                [name]: value,
            }
            setModifyFormData({
                ...modifyFormData,
                supportLink: updatedSupportLink,
            })
        } else {
            setModifyFormData({ ...modifyFormData, [name]: value })
        }
    }

    const handleAddSupportLink = () => {
        setAddFormData({
            ...addFormData,
            supportLink: [...addFormData.supportLink, { link: '', name: '' }],
        })
    }

    const handleRemoveSupportLink = (index: number) => {
        const updatedSupportLink = addFormData.supportLink.filter(
            (_, i) => i !== index,
        )
        setAddFormData({ ...addFormData, supportLink: updatedSupportLink })
    }

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data: registSupportRequestDTO = {
            title: addFormData.title,
            uploadDate: addFormData.uploadDate,
            supportLink: addFormData.supportLink,
            content: addFormData.content,
        }

        if (!selectedFile) return

        await registSupport(data, selectedFile)
        toggleAddMode()
    }

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data: modifySupportRequestDTO = {
            supportId: modifyFormData.supportId,
            title: modifyFormData.title,
            supportLink: modifyFormData.supportLink,
            content: modifyFormData.content,
        }

        if (!selectedFile) return
        modifySupport(data, selectedFile)

        toggleUpdateMode()
    }

    const handleRemoveSupport = async (
        e: React.FormEvent,
        supportId: number,
    ) => {
        await deleteSupport(supportId)

        toggleUpdateMode()
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
                    isEditMode={isEditMode}
                    isDarkMode={isDarkMode}
                    addTogle={toggleAddMode}
                    updateTogle={toggleUpdateMode}
                    setInitData={fetchFormData}
                />
            </div>

            <Modal
                isVisible={addMode}
                toggleModal={toggleAddMode}
                width="60vw"
                height="60vh"
            >
                <form onSubmit={handleAddSubmit}>
                    <input type="file" onChange={handleFileChange} required />
                    <br></br>
                    <label>
                        제목:
                        <input
                            type="text"
                            name="title"
                            value={addFormData.title}
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
                            value={addFormData.uploadDate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br></br>
                    {addFormData.supportLink.map((link, index) => (
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
                            value={addFormData.content}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <br></br>
                    <button type="submit">제출</button>
                </form>
            </Modal>

            <Modal
                isVisible={updateMode}
                toggleModal={toggleUpdateMode}
                width="60vw"
                height="60vh"
            >
                <form onSubmit={handleUpdateSubmit}>
                    <input
                        type="hidden"
                        name="supportId"
                        value={modifyFormData.supportId}
                    />
                    <input type="file" onChange={handleFileChange} />
                    <br></br>
                    <label>
                        제목:
                        <input
                            type="text"
                            name="title"
                            value={modifyFormData.title}
                            onChange={handleUpdateChange}
                            required
                        />
                    </label>
                    <br></br>
                    {modifyFormData.supportLink.map((link, index) => (
                        <div key={index}>
                            <label>
                                이름:
                                <input
                                    type="text"
                                    name="name"
                                    value={link.name}
                                    onChange={(e) =>
                                        handleUpdateChange(e, index)
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
                                        handleUpdateChange(e, index)
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
                            value={modifyFormData.content}
                            onChange={handleUpdateChange}
                            required
                        />
                    </label>

                    <br></br>
                    <button type="submit">업데이트</button>

                    <button type="button" onClick={handleRemoveSupport}>
                        삭제
                    </button>
                </form>
            </Modal>
        </article>
    )
}

export default SupportPage
