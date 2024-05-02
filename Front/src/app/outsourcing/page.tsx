'use client'

import useDarkModeStore from '@/utils/store/useThemaStore'

export default function OutsourcingPage() {
    const { isDarkMode } = useDarkModeStore()

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <h1>외주 페이지</h1>
        </article>
    )
}
