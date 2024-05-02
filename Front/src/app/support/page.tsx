'use client'

import useDarkModeStore from '@/utils/store/useThemaStore'
import dynamic from 'next/dynamic'
import React from 'react'

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
    url: string
    text: string
}

const getDomains = (): Domain[] => {
    return [
        {
            key: 'artstation',
            url: 'https://www.artstation.com/yourprofile',
            text: 'ArtStation에서 제 작품들을 확인해보세요!',
        },
        {
            key: 'cafe',
            url: 'https://cafe.naver.com/yourcommunity',
            text: '네이버 카페에서 저와 함께 다양한 주제로 이야기해요!',
        },
        {
            key: 'instagram',
            url: 'https://www.instagram.com/yourusername',
            text: 'Instagram에서 제 일상과 작품들을 만나보세요!',
        },
        {
            key: 'pixiv',
            url: 'https://www.pixiv.net/users/yourid',
            text: 'Pixiv에서 제 그림들을 감상하실 수 있습니다!',
        },
        {
            key: 'x',
            url: 'https://www.x.com/yourprofile',
            text: 'X에서 실시간으로 저와 소통할 수 있어요!',
        },
        {
            key: 'youtube',
            url: 'https://www.youtube.com/c/yourchannel',
            text: 'YouTube에서 제 콘텐츠를 구독하고 최신 비디오를 확인하세요!',
        },
    ]
}

const SupportPage: React.FC = () => {
    const domains = getDomains()
    const { isDarkMode } = useDarkModeStore()

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <h1>서포트 페이지</h1>
            {domains.map((domain, index) => {
                const Component = components[domain.key]
                return (
                    <Component
                        key={index}
                        url={domain.url}
                        height="50vh"
                        text={domain.text}
                    />
                )
            })}
        </article>
    )
}

export default SupportPage
