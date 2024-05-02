'use client'

import { useState } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import useAuthStore from '@/utils/store/useAuthStore'
import useDarkModeStore from '@/utils/store/useThemaStore'
import useEditModeStore from '@/utils/store/useEditModeStore '
import Profile from '@/component/Profile'
import Modal from '@/component/Modal'

const Header: React.FC = () => {
    const [loginVisible, setLoginVisible] = useState(false)
    const [profileMenuVisible, setProfileMenuVisible] = useState(false)

    const { isDarkMode, toggleDarkMode } = useDarkModeStore()
    const { isLoggedIn, logIn, logOut } = useAuthStore()
    const { isEditMode, toggleEditMode } = useEditModeStore()

    const toggleLogin = () => setLoginVisible(!loginVisible)
    const handleProfileClick = () => {
        setProfileMenuVisible(!profileMenuVisible)
    }
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
        <header className={`${styles.header} ${isDarkMode ? 'dark' : 'light'}`}>
            <h2 style={{ fontFamily: 'Pacifico-Regular' }}>
                <Link href="/">CanvEarth</Link>
            </h2>
            <div></div>

            <img
                onClick={toggleDarkMode}
                className={styles.toggleDarkModeButton}
                src={
                    isDarkMode ? '/svgs/moon_white.svg' : '/svgs/sun_black.svg'
                }
                alt={
                    isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
            />

            {isLoggedIn ? (
                <>
                    <div
                        className={styles.profile}
                        onClick={handleProfileClick}
                    >
                        <Profile
                            src="https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=900x900"
                            size={40}
                            border="2px solid black"
                            alt="profile image"
                            radius={50}
                        />
                        <h3>sanyamg</h3>
                    </div>

                    {profileMenuVisible && (
                        <div className={styles.profileMenu}>
                            <button onClick={logOut}>Log out</button>
                            {isEditMode ? (
                                <button onClick={toggleEditMode}>edit</button>
                            ) : (
                                <button onClick={toggleEditMode}>view</button>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.profile} onClick={toggleLogin}>
                    <img
                        className={styles.toggleLoginButton}
                        src={
                            isDarkMode
                                ? '/svgs/key_white.svg'
                                : '/svgs/key_black.svg'
                        }
                        alt="login"
                    />
                    <h3>login</h3>
                </div>
            )}

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
        </header>
    )
}

export default Header
