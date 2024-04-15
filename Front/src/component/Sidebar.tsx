'use client'

import { useState } from 'react'
import styles from './Sidebar.module.css'
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
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/outsourcing">외주</Link>
                        </li>
                        <li>
                            <Link href="/gallery">개인</Link>
                        </li>
                        <li>
                            <Link href="/support">서포트</Link>
                        </li>
                        <li>
                            <Link href="/inquire">문의</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar
