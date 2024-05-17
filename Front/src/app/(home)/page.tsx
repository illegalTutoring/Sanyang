'use client'

import styles from './home.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Component
import EditableBanner, { Images } from '@/component/banner/EditableBanner'
import DraggableProfile from '@/component/DraggableProfile'
import Profile from '@/component/Profile'

// Store
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore'

// API
import { getBanner } from '@/utils/api/banner'
import { modifyBannerList, modifyEmbedLink } from '@/utils/api/admin'
import { getNoticeList } from '@/utils/api/notice'
import { getEmbedLink } from '@/utils/api/embed'
import { embedInfo, embedLinkInfo } from '@/utils/api/DTO/embed'
import Modal from '@/component/layout/Modal'

const HomePage = () => {
    // 전역 변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    //지역변수
    const [showArrow, setShowArrow] = useState(true)
    const [showContent, setShowContent] = useState(false)
    const [images, setImages] = useState<Images[]>([])
    const [notice, setNotice] = useState<string>()
    const [embedData, setEmbedData] = useState<embedLinkInfo[]>([])
    const [isEmbedAddMode, setEmbedAddMode] = useState(false)
    const [embedFormData, setEmbedFormData] = useState({
        type: -1,
        link: '',
    })

    // 함수
    const fetchBanners = async () => {
        const response = await getBanner()

        let result: Images[] = []
        response.data.forEach((image) => {
            result.push({
                url: image.imagePath,
                yindex: image.coordinateY,
            })
        })

        setImages(result)
    }

    const fetchNotices = async (page: number, size: number) => {
        const response = await getNoticeList(page, size)

        let result: string = ''
        if (response.data) {
            result = response.data[0].title
        } else {
            result = '공지사항이 없습니다.'
        }

        setNotice(result)
    }

    const fetchEmbed = async () => {
        const response = await getEmbedLink()

        let result: embedLinkInfo[] = response.data
        setEmbedData(result)
    }

    // 핸들러
    const handleArrowClick = () => {
        setShowArrow(false)
        setShowContent(true)
        setTimeout(() => {
            const contentDiv = document.getElementById('contentDiv')
            contentDiv?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    const handleDelete = (event: React.MouseEvent, index: number) => {
        event.stopPropagation()
        setEmbedData(embedData.filter((data, idx) => idx !== index))

        let modifyEmbedLinkDTO: embedInfo[] = []
        // setter의 비동기 동작으로 인해 한번 더 필터 적용
        embedData
            .filter((data, idx) => idx !== index)
            .forEach((data) => {
                let dto: embedInfo = {
                    type: data.type,
                    link: data.link,
                }
                modifyEmbedLinkDTO.push(dto)
            })
        modifyEmbedLink({ data: modifyEmbedLinkDTO })
    }

    //훅
    useEffect(() => {
        fetchBanners()
        fetchNotices(1, 1)
        fetchEmbed()
    }, [])

    useEffect(() => {
        fetchEmbed()
    }, [isEmbedAddMode])

    const getImageSource = (type: number) => {
        switch (type) {
            case 0:
                return isDarkMode
                    ? '/svgs/youtube_white.svg'
                    : '/svgs/youtube_black.svg'
            case 1:
                return isDarkMode
                    ? '/svgs/blog_white.svg'
                    : '/svgs/blog_black.svg'
            case 2:
                return isDarkMode
                    ? '/svgs/instagram_white.svg'
                    : '/svgs/instagram_black.svg'
            case 3:
                return isDarkMode
                    ? '/svgs/twitter_white.svg'
                    : '/svgs/twitter_black.svg'
            case 4:
                return isDarkMode
                    ? '/svgs/artstation_white.svg'
                    : '/svgs/artstation_black.svg'
            case 5:
                return isDarkMode
                    ? '/svgs/pixiv_white.svg'
                    : '/svgs/pixiv_black.svg'
            case 6:
                return isDarkMode
                    ? '/svgs/add_embed_white.svg'
                    : '/svgs/add_embed_black.svg'
            default:
                return ''
        }
    }

    const moveProfile = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const newEmbedData = [...embedData]
            const draggedItem = newEmbedData.splice(dragIndex, 1)[0]
            newEmbedData.splice(hoverIndex, 0, draggedItem)
            setEmbedData(newEmbedData)
        },
        [embedData],
    )

    const modifyProfile = useCallback(() => {
        let modifyEmbedLinkDTO: embedInfo[] = []
        embedData.forEach((data) => {
            let dto: embedInfo = {
                type: data.type,
                link: data.link,
            }
            modifyEmbedLinkDTO.push(dto)
        })
        modifyEmbedLink({ data: modifyEmbedLinkDTO })
    }, [embedData])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    ): void => {
        const { name, value } = e.target
        setEmbedFormData({
            ...embedFormData,
            [name]: name === 'type' ? parseInt(value) : value,
        })
    }

    const handleAddEmbed = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault()

        const newEmbedData: embedInfo = {
            type: embedFormData.type,
            link: embedFormData.link,
        }

        let modifyEmbedLinkDTO: embedInfo[] = []

        embedData.forEach((data) => {
            let dto: embedInfo = {
                type: data.type,
                link: data.link,
            }
            modifyEmbedLinkDTO.push(dto)
        })

        modifyEmbedLinkDTO.push(newEmbedData)

        await modifyEmbedLink({ data: modifyEmbedLinkDTO })

        setEmbedAddMode(false)
    }

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <EditableBanner
                width="100%"
                height="80vh"
                images={images}
                interval={5000}
                isEditMode={isEditMode}
                isDarkMode={isDarkMode}
                fetchImages={fetchBanners}
                updateImages={modifyBannerList}
            />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {showArrow && (
                    <div
                        onClick={handleArrowClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            className={styles.shake}
                            style={{ width: '30px', margin: '30px 0 30px 0' }}
                            src={
                                isDarkMode
                                    ? '/svgs/double_down_white.svg'
                                    : '/svgs/double_down_black.svg'
                            }
                        />
                    </div>
                )}

                {showContent && (
                    <div id="contentDiv" style={{ width: '100%' }}>
                        <div>
                            <div
                                className={`${styles.colLine} ${isDarkMode ? styles.colLineDark : styles.colLineLight}`}
                            ></div>
                        </div>

                        <div
                            style={{
                                textAlign: 'center',
                                fontSize: '70px',
                                marginBottom: '30px',
                                fontFamily: 'Stalemate-Regular',
                            }}
                        >
                            Notice
                        </div>

                        <div
                            className={`${styles.notice} ${isDarkMode ? styles.noticeDark : styles.noticeLight}`}
                        >
                            {notice}
                        </div>

                        <div>
                            <div
                                className={`${styles.colLine} ${isDarkMode ? styles.colLineDark : styles.colLineLight}`}
                            ></div>
                        </div>

                        <div
                            style={{
                                textAlign: 'center',
                                fontSize: '70px',
                                marginBottom: '30px',
                                fontFamily: 'Stalemate-Regular',
                            }}
                        >
                            Contact
                        </div>

                        <Modal
                            isVisible={isEmbedAddMode}
                            toggleModal={() => {
                                setEmbedAddMode(false)
                            }}
                            width="auto"
                            height="auto"
                        >
                            <Modal
                                isVisible={isEmbedAddMode}
                                toggleModal={() => {
                                    setEmbedAddMode(false)
                                }}
                                width="60vw"
                                height="60vh"
                            >
                                <form onSubmit={handleAddEmbed}>
                                    <label>
                                        플랫폼:
                                        <select
                                            name="type"
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">선택하세요</option>
                                            <option value={1}>YouTube</option>
                                            <option value={2}>Blog</option>
                                            <option value={3}>Instagram</option>
                                            <option value={4}>Twitter</option>
                                            <option value={5}>
                                                ArtStation
                                            </option>
                                            <option value={6}>Pixiv</option>
                                        </select>
                                    </label>
                                    <br />
                                    <label>
                                        링크:
                                        <input
                                            type="url"
                                            name="link"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </label>
                                    <br />
                                    <button type="submit">추가</button>
                                </form>
                            </Modal>
                        </Modal>

                        {isEditMode ? (
                            <DndProvider backend={HTML5Backend}>
                                <div className={styles.link_container}>
                                    {embedData.map((data, index) => (
                                        <div
                                            key={index}
                                            className={styles.embedLink}
                                        >
                                            {isEditMode && (
                                                <img
                                                    className={
                                                        styles.deleteButton
                                                    }
                                                    src={'/svgs/delete_red.svg'}
                                                    alt="Delete"
                                                    onClick={(event) =>
                                                        handleDelete(
                                                            event,
                                                            index,
                                                        )
                                                    }
                                                />
                                            )}
                                            <DraggableProfile
                                                key={data.type}
                                                item={data}
                                                index={index}
                                                moveProfile={moveProfile}
                                                modifyProfile={modifyProfile}
                                            />
                                        </div>
                                    ))}
                                    <div
                                        key={-1}
                                        className={styles.embedLink}
                                        onClick={() => {
                                            setEmbedAddMode(true)
                                        }}
                                    >
                                        <Profile
                                            src={getImageSource(6)}
                                            size={70}
                                        />
                                    </div>
                                </div>
                            </DndProvider>
                        ) : (
                            <div className={styles.link_container}>
                                {embedData.map((data, index) => (
                                    <div
                                        key={index}
                                        className={styles.embedLink}
                                        onClick={() => window.open(data.link)}
                                    >
                                        <Profile
                                            src={getImageSource(data.type)}
                                            size={70}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </article>
    )
}

export default HomePage
