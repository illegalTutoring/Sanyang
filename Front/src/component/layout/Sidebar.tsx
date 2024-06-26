'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import useDarkModeStore from '@/utils/store/useThemaStore'
import useSidebrarOpenStore from '@/utils/store/useSidebarOpenStore'

const Sidebar: React.FC = () => {
    const { isSidebarOpen } = useSidebrarOpenStore()
    const { isDarkMode } = useDarkModeStore()

    return (
        <>
            <aside
                className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''} ${isDarkMode ? 'dark' : 'light'}`}
            >
                <nav>
                    <ul>
                        <li>
                            <Link href="/personal">
                                <div
                                    className={
                                        usePathname() === '/personal'
                                            ? `${styles.link} ${styles.selectedLink}`
                                            : styles.link
                                    }
                                >
                                    일정
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/outsourcing">
                                <div
                                    className={
                                        usePathname() === '/outsourcing'
                                            ? `${styles.link} ${styles.selectedLink}`
                                            : styles.link
                                    }
                                >
                                    외주
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery">
                                <div
                                    className={
                                        usePathname() === '/gallery'
                                            ? `${styles.link} ${styles.selectedLink}`
                                            : styles.link
                                    }
                                >
                                    갤러리
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/support">
                                <div
                                    className={
                                        usePathname() === '/support'
                                            ? `${styles.link} ${styles.selectedLink}`
                                            : styles.link
                                    }
                                >
                                    서포트
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/notification">
                                <div
                                    className={
                                        usePathname() === '/notification'
                                            ? `${styles.link} ${styles.selectedLink}`
                                            : styles.link
                                    }
                                >
                                    공지사항
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <br></br>
            </aside>
        </>
    )
}

export default Sidebar
