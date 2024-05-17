'use client'

import styles from './home.module.scss'
import Select, { SingleValue, StylesConfig } from 'react-select'
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
import { getNoticeList, getRecentNotice } from '@/utils/api/notice'
import { getEmbedLink } from '@/utils/api/embed'
import { embedInfo, embedLinkInfo } from '@/utils/api/DTO/embed'
interface OptionType {
    value: number
    label: string
}
import { noticeDetailInfo } from '@/utils/api/DTO/notice'
import Modal from '@/component/layout/Modal'

const HomePage = () => {
    // 전역 변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    //지역변수
    const [isFocused, setIsFocused] = useState(false)
    const [isDetailModalVisible, setDetailModalVisible] = useState(false)
    const toggleDetailModal = () => setDetailModalVisible(!isDetailModalVisible)

    const [showArrow, setShowArrow] = useState(true)
    const [showContent, setShowContent] = useState(false)
    const [images, setImages] = useState<Images[]>([])
    const [notice, setNotice] = useState<noticeDetailInfo>({
        content: '',
        id: 0,
        registDate: '',
        title: '공지사항이 존재하지 않습니다.',
        username: '',
        views: 0,
    })
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

    const fetchNotices = async () => {
        const response = await getRecentNotice()
        setNotice(
            response.data || {
                content: '',
                id: 0,
                registDate: '',
                title: '공지사항이 존재하지 않습니다.',
                username: '',
                views: 0,
            },
        )
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
        fetchNotices()
        fetchEmbed()
    }, [])

    useEffect(() => {
        fetchEmbed()
    }, [isEmbedAddMode])

    const options: OptionType[] = [
        { value: 0, label: 'YouTube' },
        { value: 1, label: 'Blog' },
        { value: 2, label: 'Instagram' },
        { value: 3, label: 'Twitter' },
        { value: 4, label: 'ArtStation' },
        { value: 5, label: 'Pixiv' },
    ]

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
        e:
            | React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
            | { target: { name: string; value: string | number } },
    ): void => {
        const { name, value } = e.target
        setEmbedFormData({
            ...embedFormData,
            [name]: name === 'type' ? parseInt(value as string) : value,
        })
    }

    const handleSelectChange = (selectedOption: SingleValue<OptionType>) => {
        handleInputChange({
            target: {
                name: 'type',
                value: selectedOption ? selectedOption.value : -1,
            },
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

    const customStyles: StylesConfig<OptionType, false> = {
        control: (provided) => ({
            ...provided,
        }),
        menu: (provided) => ({
            ...provided,
            overflowY: 'auto',
        }),
        option: (provided) => ({
            ...provided,
            height: '30px',
            display: 'flex',
            alignItems: 'center',
        }),
    }

    return (
        <>
            <Modal
                width="50%"
                height="fit-content"
                isVisible={isDetailModalVisible}
                toggleModal={toggleDetailModal}
            >
                <div className={styles.detailContainer}>
                    <h3 className={styles.detailTitle}>
                        {notice && notice.title}
                    </h3>
                    <div className={styles.detailInfo}>
                        <div>{notice && notice.registDate}</div>
                        <div>조회수: {notice && notice.views}</div>
                    </div>
                    <div className={styles.detailContent}>
                        {notice && notice.content}
                    </div>
                </div>
            </Modal>

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
                                style={{
                                    width: '30px',
                                    margin: '30px 0 30px 0',
                                }}
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
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '25px',
                                }}
                                className={`${styles.notice} ${isDarkMode ? styles.noticeDark : styles.noticeLight}`}
                                onClick={() => toggleDetailModal()}
                            >
                                {notice.title}
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
                                <form onSubmit={handleAddEmbed}>
                                    <div
                                        className={
                                            styles.platformModalContainer
                                        }
                                    >
                                        <div
                                            className={
                                                styles.platformModalHeader
                                            }
                                        >
                                            <div>플랫폼</div>
                                            <Select
                                                name="type"
                                                options={options}
                                                onChange={handleSelectChange}
                                                placeholder="선택하세요"
                                                isSearchable={false}
                                                className={styles.customSelect}
                                                styles={customStyles}
                                                onMenuOpen={() => {
                                                    setIsFocused(true)
                                                }}
                                                onMenuClose={() =>
                                                    setIsFocused(false)
                                                }
                                                required
                                            />
                                        </div>
                                        <div
                                            className={`${styles.transitionContainer} ${
                                                !isFocused &&
                                                styles.transitionContainerHidden
                                            }`}
                                        ></div>
                                        <div
                                            className={styles.platformModalLink}
                                        >
                                            <div>링크</div>
                                            <input
                                                type="url"
                                                name="link"
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div
                                            className={
                                                styles.platformModalButton
                                            }
                                        >
                                            <button
                                                className={styles.blueButton}
                                                type="submit"
                                            >
                                                추가
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
                                                        src={
                                                            '/svgs/delete_red.svg'
                                                        }
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
                                                    modifyProfile={
                                                        modifyProfile
                                                    }
                                                />
                                            </div>
                                        ))}
                                        <div
                                            key={-1}
                                            className={styles.embedLink}
                                            // onClick={
                                            //      이곳에 임베드 추가 이벤트
                                            // }
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
                                            onClick={() =>
                                                window.open(data.link)
                                            }
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
        </>
    )
}

export default HomePage
