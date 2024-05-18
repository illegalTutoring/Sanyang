import React from 'react'
import styles from './Footer.module.scss'
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.contactInfo}>
                <p>© 2024 Sanyang. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
