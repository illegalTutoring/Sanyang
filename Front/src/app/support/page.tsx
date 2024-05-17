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
    // 전역 변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    // 지역 변수
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
    const [imageURL, setImageURL] = useState<string | null>(null)

    // 토글 함수
    const toggleAddMode = () => {
        setAddFormData({
            title: '',
            uploadDate: '',
            supportLink: [{ link: '', name: '' }],
            content: '',
        })
        setSelectedFile(null)
        setAddMode((prev) => !prev)
    }

    const toggleUpdateMode = () => {
        setSelectedFile(null)
        setUpdateMode((prev) => !prev)
    }

    // fetch 함수
    const fetchSupport = async () => {
        const response = (await getSupportList()) || []
        setSupportData(response.data)
    }

    const fetchFormData = async (
        item: modifySupportRequestDTO,
        imageURL: string,
    ) => {
        setModifyFormData(item)
        setImageURL(imageURL)
    }

    // 훅
    useEffect(() => {
        fetchSupport()
    }, [addMode, updateMode])

    // 이밴트 핸들러
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setSelectedFile(file)

            const reader = new FileReader()
            reader.onloadend = () => {
                setImageURL(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddInputChange = (
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

    const handleUpdateInputChange = (
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

    const handleAddModalAddSupportLink = () => {
        setAddFormData({
            ...addFormData,
            supportLink: [...addFormData.supportLink, { link: '', name: '' }],
        })
    }

    const handleAddModalRemoveSupportLink = (index: number) => {
        const updatedSupportLink = addFormData.supportLink.filter(
            (_, i) => i !== index,
        )
        setAddFormData({ ...addFormData, supportLink: updatedSupportLink })
    }

    const handleUpdateModalAddSupportLink = () => {
        setModifyFormData({
            ...modifyFormData,
            supportLink: [
                ...modifyFormData.supportLink,
                { link: '', name: '' },
            ],
        })
    }

    const handleUpdateModalRemoveSupportLink = (index: number) => {
        const updatedSupportLink = modifyFormData.supportLink.filter(
            (_, i) => i !== index,
        )
        setModifyFormData({
            ...modifyFormData,
            supportLink: updatedSupportLink,
        })
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

        await modifySupport(data, selectedFile)

        toggleUpdateMode()
    }

    const handleRemoveSupport = async (supportId: number) => {
        await deleteSupport(supportId)

        toggleUpdateMode()
    }

    function getCurrentDate() {
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
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
                width="fit-content"
                height="fit-content"
            >
                <form
                    onSubmit={handleAddSubmit}
                    className={`${isDarkMode ? 'dark' : 'light'}`}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fit, 250px, 1fr)`,
                        gridGap: '20px',
                        padding: '10px',
                    }}
                >
                    <div className={styles.cardAddModal}>
                        <div
                            className={styles.cardAddModalHeader}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '60px 1fr',
                            }}
                        >
                            <div
                                className={styles.cardAddModalHeaderAddImage}
                                onClick={() =>
                                    document
                                        .getElementById('fileInput')
                                        ?.click()
                                }
                            >
                                {imageURL ? (
                                    <img src={imageURL} alt="Selected" />
                                ) : isDarkMode ? (
                                    <img
                                        src="/svgs/image_plus_white.svg"
                                        alt="Plus"
                                    />
                                ) : (
                                    <img
                                        src="/svgs/image_plus_black.svg"
                                        alt="Plus"
                                    />
                                )}
                            </div>
                            <div>
                                <div style={{ fontSize: '20px' }}>
                                    <input
                                        type="text"
                                        name="title"
                                        value={addFormData.title}
                                        onChange={(e) =>
                                            handleAddInputChange(e)
                                        }
                                        placeholder="제목"
                                        style={{
                                            color: isDarkMode
                                                ? 'white'
                                                : 'black',
                                        }}
                                        required
                                    />
                                </div>
                                <hr></hr>
                                <div className={styles.dateBox}>
                                    <div>{getCurrentDate()}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardAddModalContent}>
                            <textarea
                                name="content"
                                placeholder="내용을 입력해주세요.."
                                value={addFormData.content}
                                onChange={(e) => handleAddInputChange(e)}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    resize: 'none',
                                }}
                                required
                            />
                        </div>
                        <div
                            className={`${styles.cardAddModalLinkContainer} ${isDarkMode ? styles.linkBoxDark : styles.linkBoxLight}`}
                        >
                            {addFormData.supportLink.map((link, index) => (
                                <div
                                    className={styles.cardAddModalLink}
                                    key={index}
                                >
                                    <input
                                        className={styles.cardAddModalLinkTitle}
                                        type="text"
                                        name="name"
                                        value={link.name}
                                        onChange={(e) =>
                                            handleAddInputChange(e, index)
                                        }
                                        required
                                        placeholder="후원링크 제목 입력"
                                    />
                                    <input
                                        className={styles.cardAddModalLinkUrl}
                                        type="url"
                                        name="link"
                                        value={link.link}
                                        onChange={(e) =>
                                            handleAddInputChange(e, index)
                                        }
                                        required
                                        placeholder="링크 url 입력"
                                    />
                                    {index > 0 ? (
                                        <img
                                            onClick={() =>
                                                handleAddModalRemoveSupportLink(
                                                    index,
                                                )
                                            }
                                            src="svgs/delete_red.svg"
                                        />
                                    ) : (
                                        <img
                                            onClick={
                                                handleAddModalAddSupportLink
                                            }
                                            src="svgs/add_blue.svg"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className={styles.cardAddModalSubmit}>
                            <button
                                style={{ width: '100%' }}
                                className={styles.blueButton}
                                type="submit"
                            >
                                후원카드 등록
                            </button>
                        </div>
                        <input
                            id="fileInput"
                            type="file"
                            name="upfile"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <input
                            type="date"
                            name="uploadDate"
                            value={getCurrentDate()}
                            onChange={(e) => handleAddInputChange(e)}
                            style={{ display: 'none' }}
                            required
                        />
                    </div>
                </form>
            </Modal>

            <Modal
                isVisible={updateMode}
                toggleModal={toggleUpdateMode}
                width="fit-content"
                height="fit-content"
            >
                <form onSubmit={handleUpdateSubmit}>
                    <div className={styles.cardAddModal}>
                        <div
                            className={styles.cardAddModalHeader}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '60px 1fr',
                            }}
                        >
                            <div
                                className={styles.cardAddModalHeaderAddImage}
                                onClick={() =>
                                    document
                                        .getElementById('fileInput')
                                        ?.click()
                                }
                            >
                                {imageURL ? (
                                    <img src={imageURL} alt="Selected" />
                                ) : isDarkMode ? (
                                    <img
                                        src="/svgs/image_plus_white.svg"
                                        alt="Plus"
                                    />
                                ) : (
                                    <img
                                        src="/svgs/image_plus_black.svg"
                                        alt="Plus"
                                    />
                                )}
                            </div>
                            <div>
                                <div style={{ fontSize: '20px' }}>
                                    <input
                                        type="text"
                                        name="title"
                                        value={modifyFormData.title}
                                        onChange={(e) =>
                                            handleUpdateInputChange(e)
                                        }
                                        required
                                        style={{
                                            color: isDarkMode
                                                ? 'white'
                                                : 'black',
                                        }}
                                    />
                                </div>
                                <hr></hr>
                                <div className={styles.dateBox}>
                                    <div>{getCurrentDate()}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardAddModalContent}>
                            <textarea
                                placeholder="내용을 입력해주세요.."
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    resize: 'none',
                                }}
                                name="content"
                                value={modifyFormData.content}
                                onChange={(e) => handleUpdateInputChange(e)}
                                required
                            />
                        </div>
                        <div
                            className={`${styles.cardAddModalLinkContainer} ${isDarkMode ? styles.linkBoxDark : styles.linkBoxLight}`}
                        >
                            {modifyFormData.supportLink.map((link, index) => (
                                <div
                                    className={styles.cardAddModalLink}
                                    key={index}
                                >
                                    <input
                                        className={styles.cardAddModalLinkTitle}
                                        type="text"
                                        name="name"
                                        value={link.name}
                                        onChange={(e) =>
                                            handleUpdateInputChange(e, index)
                                        }
                                        required
                                        placeholder="후원링크 제목 입력"
                                    />
                                    <input
                                        className={styles.cardAddModalLinkUrl}
                                        type="url"
                                        name="link"
                                        value={link.link}
                                        onChange={(e) =>
                                            handleUpdateInputChange(e, index)
                                        }
                                        required
                                        placeholder="링크 url 입력"
                                    />
                                    {index > 0 ? (
                                        <img
                                            onClick={() =>
                                                handleUpdateModalRemoveSupportLink(
                                                    index,
                                                )
                                            }
                                            src="svgs/delete_red.svg"
                                        />
                                    ) : (
                                        <img
                                            onClick={
                                                handleUpdateModalAddSupportLink
                                            }
                                            src="svgs/add_blue.svg"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className={styles.cardAddModalSubmit}>
                            <button className={styles.blueButton} type="submit">
                                업데이트
                            </button>
                            <button
                                className={styles.redButton}
                                onClick={() =>
                                    handleRemoveSupport(
                                        modifyFormData.supportId,
                                    )
                                }
                            >
                                삭제
                            </button>
                        </div>
                        <input
                            id="fileInput"
                            type="file"
                            name="upfile"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <input
                            type="date"
                            name="uploadDate"
                            value={getCurrentDate()}
                            onChange={(e) => handleUpdateInputChange(e)}
                            style={{ display: 'none' }}
                            required
                        />
                        <input
                            type="hidden"
                            name="supportId"
                            value={modifyFormData.supportId}
                        />
                    </div>
                </form>
            </Modal>
        </article>
    )
}

export default SupportPage
