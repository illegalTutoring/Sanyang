import './global.scss' // 전역 스타일
import Header from '@/component/Header' // 해더 컴포넌트
import Sidebar from '@/component/Sidebar' // 사이드바 컴포넌트
import Footer from '@/component/Footer' // 푸터 컴포넌트
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
