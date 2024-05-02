'use client'

import Modal from '@/component/Modal'
import style from './home.module.scss'
import Banner from '@/component/Banner'
import Profile from '@/component/Profile'
import List from '@/component/TagList'
import ImageUploadPreview from '@/component/ImageUploadPreview'
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore '

import { useState } from 'react'

const HomePage = () => {
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    const [editBanner, setEditBanner] = useState(false)
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
                height="50vh"
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

            <div className={style.container_col}>
                <div className={style.link_container}>
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
                <div>
                    <List
                        width="100%"
                        height="40vh"
                        pageSize={10}
                        columns={['userId', 'client', 'title']}
                        tagActions={{
                            All: () => getDummyOutsourcingList(2024, 4), // 이게 기본동작이면 합치는게 맞고
                            Update: () => getDummyOutsourcingList(2024, 4), // 이게 기본동작이면 나누는게 맞다
                            Notice: () => getDummyOutsourcingList(2024, 4),
                        }}
                    />
                </div>
            </div>

            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
            <h1>메인 페이지</h1>
        </article>
    )
}

export default HomePage
