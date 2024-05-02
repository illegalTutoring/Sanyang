'use client'

import Modal from '@/component/Modal'
import styles from './home.module.scss'
import Banner from '@/component/Banner'
import Profile from '@/component/Profile'
import List from '@/component/TagList'
import ImageUploadPreview from '@/component/ImageUploadPreview'
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore '

import { useEffect, useState } from 'react'

const HomePage = () => {
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    const [showArrow, setShowArrow] = useState(true)
    const [showContent, setShowContent] = useState(false)

    const handleArrowClick = () => {
        setShowArrow(false) // 화살표 숨기기
        setShowContent(true) // 내용 보이기
        // 스크롤 이동
        setTimeout(() => {
            const contentDiv = document.getElementById('contentDiv')
            contentDiv?.scrollIntoView({ behavior: 'smooth' })
        }, 100) // 콘텐츠가 렌더링 된 후 스크롤
    }

    const [editBanner, setEditBanner] = useState(false)
    const [notice, setNotice] = useState(
        '안녕하세요. 작가 산양입니다.\n 1년정도 쉬고 돌아오겠습니다. 손가락 빨고 기다리고 계십셔',
    )

    const toggleEditBanner = () => setEditBanner(!editBanner)

    const [images, setImages] = useState([
        'https://pbs.twimg.com/media/Feng68VakAAKD6u?format=jpg&name=large',
        'https://pbs.twimg.com/media/Feng68WaEAIQvfS?format=jpg&name=large',
        'https://pbs.twimg.com/media/Feng68SagAAfkW3?format=jpg&name=4096x4096',
    ])

    const getDummyOutsourcingList = async (year: number, month: number) => {
        return {
            message: `${year}년 ${month}월 외주 목록입니다.`,
            outsourcingInfo: [
                {
                    userId: 'sanyang',
                    client: 'D&F',
                    title: 'D&F 신규 캐릭터 일러스트 작업',
                    startDate: '2024-04-01',
                    endDate: '2024-04-30',
                },
                {
                    userId: 'sanyang',
                    client: 'D&F',
                    title: 'D&F 신규 업데이트 일러스트 작업',
                    startDate: '2024-05-01',
                    endDate: '2024-05-31',
                },
            ],
        }
    }

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <Banner
                images={images}
                interval={5000}
                width="100%"
                yindex={[-60, -150, -450]}
                height="80vh"
            />

            {isEditMode && (
                <Modal
                    isVisible={editBanner}
                    toggleModal={toggleEditBanner}
                    width="60vw"
                    height="60vh"
                >
                    <ImageUploadPreview></ImageUploadPreview>
                </Modal>
            )}

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
                    <div id="contentDiv">
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
                            <Profile
                                src="https://jariyo-s3.s3.ap-northeast-2.amazonaws.com/logo/Vector-Instagram-icon-PNG.png"
                                size={70}
                                border="1px solid balck"
                                alt="instargram"
                                radius={50}
                            />
                            <Profile
                                src="https://jariyo-s3.s3.ap-northeast-2.amazonaws.com/logo/twitter_x_new_logo_x_rounded_icon_256078.png"
                                size={80}
                                border="1px solid balck"
                                alt="X-Twitter"
                                radius={50}
                            />
                            <Profile
                                src="https://jariyo-s3.s3.ap-northeast-2.amazonaws.com/logo/pngwing.com.png"
                                size={70}
                                border="1px solid balck"
                                alt="gumload"
                                radius={50}
                            />
                            <Profile
                                src="https://jariyo-s3.s3.ap-northeast-2.amazonaws.com/logo/PATREON_SYMBOL_1_BLACK_RGB.svg"
                                size={70}
                                border="1px solid balck"
                                alt="gumload"
                                radius={50}
                            />
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}

export default HomePage
