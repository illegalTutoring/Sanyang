'use client'

import style from './home.module.scss'
import Banner from '@/component/Banner'
import Profile from '@/component/Profile'

const HomePage = () => {
    return (
        <>
            <Banner
                images={[
                    'https://pbs.twimg.com/media/Feng68VakAAKD6u?format=jpg&name=large',
                    'https://pbs.twimg.com/media/Feng68WaEAIQvfS?format=jpg&name=large',
                    'https://pbs.twimg.com/media/Feng68SagAAfkW3?format=jpg&name=4096x4096',
                ]}
                interval={3000}
                width="100%"
                height="350px"
            />
            <div className={style.container_col}>
                <div>
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
                    <h1>겔러리</h1>
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
        </>
    )
}

export default HomePage
