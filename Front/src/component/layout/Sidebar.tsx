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
            <img
                onClick={() => setIsOpen(!isOpen)}
                className={styles.toggleButton}
                style={{ cursor: 'pointer', width: '30px', height: '30px' }}
                src={
                    isDarkMode ? '/svgs/menu_white.svg' : '/svgs/menu_black.svg'
                }
                alt={`${isOpen ? 'Close Menu' : 'Open Menu'}`}
            />
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
