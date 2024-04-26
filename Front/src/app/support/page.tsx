'use client'

import { useDarkModeStore } from '@/utils/store/useThemaStore'

export default function GalleryPage() {
    const { darkMode } = useDarkModeStore()

    return (
        <article className={`${darkMode ? 'dark' : 'light'}`}>
            <h1>서포트 페이지</h1>
        </article>
    )
}
