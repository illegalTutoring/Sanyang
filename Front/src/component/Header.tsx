import styles from './Header.module.scss'
import Link from 'next/link'

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <h2>
                <Link href="/">CanvEarth</Link>
            </h2>
        </header>
    )
}

export default Header
