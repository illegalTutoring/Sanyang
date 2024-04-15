import './global.scss'
import Header from '@/component/Header'
import Sidebar from '@/component/Sidebar'
import Footer from '@/component/Footer'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
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
                    <article>{children}</article>
                    <Footer />
                </main>
            </body>
        </html>
    )
}
