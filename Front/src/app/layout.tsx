import './global.scss' // 전역 스타일
import Header from '@/component/layout/Header' // 해더 컴포넌트
import Sidebar from '@/component/layout/Sidebar' // 사이드바 컴포넌트
import Footer from '@/component/layout/Footer' // 푸터 컴포넌트
import { Metadata } from 'next'

// 메타데이터 설정
export const metadata: Metadata = {
    title: {
        default: 'Sanyang Portfolio - Illustrator & Artist',
        template: '%s | Sanyang Portfolio',
    },
    description: 'Sanyang’s illustrations portfolio.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body>
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
