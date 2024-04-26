'use client'

import style from './home.module.scss'
import Banner from '@/component/Banner'
import Profile from '@/component/Profile'
import List from '@/component/TagList'
import { useDarkModeStore } from '@/utils/store/useThemaStore'

const HomePage = () => {
    const { darkMode } = useDarkModeStore()

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
        <article className={`${darkMode ? 'dark' : 'light'}`}>
            <Banner
                images={[
                    'https://pbs.twimg.com/media/Feng68VakAAKD6u?format=jpg&name=large',
                    'https://pbs.twimg.com/media/Feng68WaEAIQvfS?format=jpg&name=large',
                    'https://pbs.twimg.com/media/Feng68SagAAfkW3?format=jpg&name=4096x4096',
                ]}
                interval={3000}
                width="100%"
                height="50vh"
            />
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
                            All: () => getDummyOutsourcingList(2024, 4),
                            Active: () => getDummyOutsourcingList(2024, 4),
                            Completed: () => getDummyOutsourcingList(2024, 4),
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
