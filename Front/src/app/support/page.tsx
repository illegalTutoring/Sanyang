'use client'

import SupportCard from '@/component/SupportCard'
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

    const supportData = [
        {
            supportId: 3,
            thumbnail:
                'https://b105.s3.ap-northeast-2.amazonaws.com/0f111a3b-cf15-4117-82b4-12ddaac9aa00_support.png',
            title: '수채화 기법 마스터하기',
            uploadDate: '2024-05',
            supportLink: [
                {
                    name: '아트스테이션',
                    link: 'https://www.artstation.com/',
                },
                {
                    name: '디바인트아트',
                    link: 'https://www.deviantart.com/',
                },
            ],
            content:
                '수채화 그리기의 기초부터 고급 기법까지 단계별로 정리해 봤습니다. 이 가이드가 여러분의 그림 실력 향상에 도움이 되기를 바랍니다!',
        },
        {
            supportId: 4,
            thumbnail:
                'https://b105.s3.ap-northeast-2.amazonaws.com/d8e9fe3b-584f-4749-b4a9-e03b0e979dbc_support.png',
            title: '디지털 일러스트레이션 팁',
            uploadDate: '2024-06',
            supportLink: [
                {
                    name: '프로크리에이트',
                    link: 'https://procreate.art/',
                },
                {
                    name: '클립스튜디오',
                    link: 'https://www.clipstudio.net/',
                },
            ],
            content:
                '효과적인 디지털 일러스트레이션 작업을 위한 기술적 팁과 트릭들을 공유합니다. 툴 사용법부터 창의적인 아이디어 발전까지!',
        },
        {
            supportId: 5,
            thumbnail:
                'https://b105.s3.ap-northeast-2.amazonaws.com/26e5b7e0-4584-4cd3-8b1c-3b918c1bb1f2_support.png',
            title: '캐릭터 디자인의 모든 것',
            uploadDate: '2024-04',
            supportLink: [
                {
                    name: '픽시브',
                    link: 'https://www.pixiv.net/',
                },
                {
                    name: '베헨스',
                    link: 'https://www.behance.net/',
                },
            ],
            content:
                '캐릭터 디자인의 기초부터 고급 전략까지, 다양한 스타일과 기술을 아우르는 포괄적인 안내서입니다.',
        },
        {
            supportId: 6,
            thumbnail:
                'https://b105.s3.ap-northeast-2.amazonaws.com/7e8a6d44-b49f-4de1-817f-aafeaad82c67_support.png',
            title: '애니메이션 기초',
            uploadDate: '2024-07',
            supportLink: [
                {
                    name: '애니메이션 워크샵',
                    link: 'https://www.animationworkshop.com/',
                },
                {
                    name: '애니메이터스 리소스',
                    link: 'https://www.animatorsresource.com/',
                },
            ],
            content:
                '애니메이션 제작의 기초부터 실제 애니메이션 프로젝트를 진행하는 데 필요한 팁까지 제공합니다.',
        },
    ]

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <SupportCard
                items={supportData}
                isEditMode={false}
                isDarkMode={isDarkMode}
            />

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
