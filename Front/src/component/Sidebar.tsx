'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.scss'
import Link from 'next/link'

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                className={styles.toggleButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Close' : 'Menu'}
            </button>
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
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
            </aside>
        </>
    )
}

export default Sidebar