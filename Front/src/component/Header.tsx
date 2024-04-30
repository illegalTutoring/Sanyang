'use client'

import styles from './Header.module.scss'
import Link from 'next/link'
import Profile from '@/component/Profile'
import useAuthStore from '@/utils/store/useAuthStore'
import useDarkModeStore from '@/utils/store/useThemaStore'

const Header: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useDarkModeStore()
    const { isLoggedIn, logOut } = useAuthStore()

    return (
        <header className={`${styles.header} ${isDarkMode ? 'dark' : 'light'}`}>
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
                    <h3 onClick={logOut}>sanyamg</h3>
                </div>
            ) : (
                <div></div>
            )}

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
        </header>
    )
}

export default Header
