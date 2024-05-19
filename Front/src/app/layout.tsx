import './global.scss' // 전역 스타일
import Header from '@/component/layout/Header' // 해더 컴포넌트
import Sidebar from '@/component/layout/Sidebar' // 사이드바 컴포넌트
import Footer from '@/component/layout/Footer' // 푸터 컴포넌트
import { Metadata } from 'next'
import Head from 'next/head'
import Analytics from '../component/Analytics'
import GoogleAnalytics from '@/component/GoogleAnalytics'

// 메타데이터 설정
export const metadata: Metadata = {
    title: {
        default: 'Sanyang Portfolio - Illustrator & Artist | 산양 포트폴리오 - 일러스트레이터 & 아티스트',
        template: '%s | Sanyang Portfolio | 산양 포트폴리오',
    },
    description: 'Sanyang’s illustrations portfolio. 산양의 일러스트 포트폴리오입니다.',
    icons: {
        icon: './favicon.svg',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body>
                {process.env.NEXT_PUBLIC_GA_ID ? (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
				) : null}
                <Header />
                <Sidebar />
                <main>
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    )
}
