'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import useDarkModeStore from '@/utils/store/useThemaStore'

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { isDarkMode } = useDarkModeStore()

    return (
        <>
            <button
                className={styles.toggleButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Close' : 'Menu'}
            </button>
            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${isDarkMode ? 'dark' : 'light'}`}
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
                                    개인일정
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
                            <Link href="/inquire">
                                <div
                                    className={
                                        usePathname() === '/inquire'
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
