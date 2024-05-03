'use client'

import styles from './home.module.scss'
import Banner from '@/component/Banner'
import Profile from '@/component/Profile'
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore '

import { useEffect, useState } from 'react'

const HomePage = () => {
    // 전역 변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    //지역변수
    const [showArrow, setShowArrow] = useState(true)
    const [showContent, setShowContent] = useState(false)
    const [editBanner, setEditBanner] = useState(false)
    const [images, setImages] = useState([
        'https://pbs.twimg.com/media/Feng68VakAAKD6u?format=jpg&name=large',
        'https://pbs.twimg.com/media/Feng68WaEAIQvfS?format=jpg&name=large',
        'https://pbs.twimg.com/media/Feng68SagAAfkW3?format=jpg&name=4096x4096',
    ])
    const [notice, setNotice] = useState(
        '안녕하세요. 작가 산양입니다.\n 1년정도 쉬고 돌아오겠습니다. 손가락 빨고 기다리고 계십셔',
    )

    //함수
    const toggleEditBanner = () => setEditBanner(!editBanner)

    const handleArrowClick = () => {
        setShowArrow(false)
        setShowContent(true)
        setTimeout(() => {
            const contentDiv = document.getElementById('contentDiv')
            contentDiv?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

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
                    ? '/svgs/etc_white.svg'
                    : '/svgs/etc_black.svg'
            default:
                return ''
        }
    }

    // 더미 데이터
    const embedData = [
        {
            type: 0,
            link: 'https://example.com/link1',
        },
        {
            type: 1,
            link: 'https://example.com/link2',
        },
        {
            type: 2,
            link: 'https://example.com/link3',
        },
        {
            type: 3,
            link: 'https://example.com/link4',
        },
        {
            type: 4,
            link: 'https://example.com/link5',
        },
        {
            type: 5,
            link: 'https://example.com/link6',
        },
        {
            type: 6,
            link: 'https://example.com/link7',
        },
    ]

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <Banner
                images={images}
                interval={5000}
                width="100%"
                yindex={[0, 0, 0]}
                height="80vh"
                isEditMode={isEditMode}
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

                        <div className={styles.link_container}>
                            {embedData.map((data, index) => (
                                <div
                                    key={index}
                                    style={{ marginBottom: '50px' }}
                                >
                                    <Profile
                                        src={getImageSource(data.type)}
                                        size={70}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}

export default HomePage
