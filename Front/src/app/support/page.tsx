'use client'

import useDarkModeStore from '@/utils/store/useThemaStore'

export default function GalleryPage() {
    const { isDarkMode } = useDarkModeStore()

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <h1>서포트 페이지</h1>
        </article>
    )
}
