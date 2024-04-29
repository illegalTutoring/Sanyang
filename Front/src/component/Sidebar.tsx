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
    const { isDarkMode, toggleDarkMode } = useDarkModeStore()
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

                <img
                    onClick={toggleDarkMode}
                    className={styles.toggleDarkModeButton}
                    src={
                        isDarkMode
                            ? '/svgs/moon_white.svg'
                            : '/svgs/sun_black.svg'
                    }
                    alt={
                        isDarkMode
                            ? 'Switch to light mode'
                            : 'Switch to dark mode'
                    }
                />

                <br></br>

                <img
                    onClick={toggleLogin}
                    className={styles.toggleDarkModeButton}
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
