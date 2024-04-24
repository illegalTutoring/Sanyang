import styles from './Header.module.scss'
import Link from 'next/link'
import Profile from '@/component/Profile'

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <h2>
                <Link href="/">CanvEarth</Link>
            </h2>
            <div></div>
            <div className={styles.profile}>
                <Profile
                    src="https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=900x900"
                    size={40}
                    border="2px solid balck"
                    alt="profile image"
                    radius={50}
                />
                <h3>sanyamg</h3>
            </div>
        </header>
    )
}

export default Header
