'use client'

import useDarkModeStore from '@/utils/store/useThemaStore'

export default function NotificationPage() {
    const { isDarkMode } = useDarkModeStore()

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <h1>공지사항 페이지</h1>
        </article>
    )
}
