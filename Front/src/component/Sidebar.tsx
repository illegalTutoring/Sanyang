'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import Modal from '@/component/Modal'
import useAuthStore from '@/utils/store/useAuthStore'
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore '

const Sidebar: React.FC = () => {
    const { isDarkMode } = useDarkModeStore()
    const { isLoggedIn, logIn } = useAuthStore()
    const { isEditMode, toggleEditMode } = useEditModeStore()

    const [isOpen, setIsOpen] = useState(false)
    const [loginVisible, setLoginVisible] = useState(false)

    const toggleLogin = () => setLoginVisible(!loginVisible)

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = event.currentTarget.username.value
        const password = event.currentTarget.password.value

        if (username === 'ssafy' && password === 'ssafy') {
            logIn()
        } else {
            alert('사용자가 다릅니다. 다시 시도해주세요.')
        }
    }

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

                <img
                    onClick={toggleLogin}
                    className={styles.toggleLoginButton}
                    src={
                        isDarkMode
                            ? '/svgs/key_white.svg'
                            : '/svgs/key_black.svg'
                    }
                    alt="login"
                />

                <br></br>

                {isLoggedIn &&
                    (isEditMode ? (
                        <button onClick={toggleEditMode}>edit</button>
                    ) : (
                        <button onClick={toggleEditMode}>view</button>
                    ))}

                {loginVisible && (
                    <>
                        <Modal
                            isVisible={loginVisible}
                            toggleModal={toggleLogin}
                            width="40vw"
                            height="60vh"
                        >
                            <div className={styles.loginModal}>
                                <h1>Login</h1>
                                <form
                                    className={styles.loginForm}
                                    onSubmit={handleLogin}
                                >
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        required
                                    />
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                    />
                                    <button type="submit">Login</button>
                                </form>
                                <p>
                                    Need an account?{' '}
                                    <Link href="/signup">Sign up</Link>
                                </p>
                            </div>
                        </Modal>
                    </>
                )}
            </aside>
        </>
    )
}

export default Sidebar
