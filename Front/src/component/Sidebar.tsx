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
                            <Link href="/outsourcing">외주</Link>
                            {usePathname() === '/outsourcing' ? ' ⦁' : ''}
                        </li>
                        <li>
                            <Link href="/gallery">개인</Link>
                            {usePathname() === '/gallery' ? ' ⦁' : ''}
                        </li>
                        <li>
                            <Link href="/support">서포트</Link>
                            {usePathname() === '/support' ? ' ⦁' : ''}
                        </li>
                        <li>
                            <Link href="/inquire">문의</Link>
                            {usePathname() === '/inquire' ? ' ⦁' : ''}
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
