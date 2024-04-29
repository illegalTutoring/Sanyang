'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import useAuthStore from '@/utils/store/useAuthStore'
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore '

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { isDarkMode, toggleDarkMode } = useDarkModeStore()
    const { isLoggedIn } = useAuthStore()
    const { isEditMode, toggleEditMode } = useEditModeStore()

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
                                    개인
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
                                    문의
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button onClick={toggleDarkMode}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                <br></br>

                {isLoggedIn &&
                    (isEditMode ? (
                        <button onClick={toggleEditMode}>edit</button>
                    ) : (
                        <button onClick={toggleEditMode}>view</button>
                    ))}
            </aside>
        </>
    )
}

export default Sidebar
