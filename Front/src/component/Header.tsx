'use client'

import styles from './Header.module.scss'
import Link from 'next/link'
import Profile from '@/component/Profile'
import Modal from '@/component/Modal'
import useAuthStore from '@/utils/store/useAuthStore'
import { useDarkModeStore } from '@/utils/store/useThemaStore'

const Header: React.FC = () => {
    const { isLoggedIn } = useAuthStore()
    const { darkMode } = useDarkModeStore()

    return (
        <header className={`${styles.header} ${darkMode ? 'dark' : 'light'}`}>
            <h2>
                <Link href="/">CanvEarth</Link>
            </h2>
            <div></div>

            {isLoggedIn ? (
                <div className={styles.profile}>
                    <Profile
                        src="https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=900x900"
                        size={40}
                        border="2px solid black"
                        alt="profile image"
                        radius={50}
                    />
                    <h3>sanyamg</h3>
                </div>
            ) : (
                <Modal width="40vw" height="60vh">
                    <div className={styles.loginModal}>
                        <h1>Login</h1>
                        <form className={styles.loginForm}>
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
                            Need an account? <Link href="/signup">Sign up</Link>
                        </p>
                    </div>
                </Modal>
            )}
        </header>
    )
}

export default Header
