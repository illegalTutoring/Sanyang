import React from 'react'
import styles from './Footer.module.scss'
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.contactInfo}>
                <p>© 2024 Sanyang. All rights reserved.</p>
                <p>
                    Contact me at{' '}
                    <a href="mailto:sanyang@example.com">sanyang@example.com</a>
                </p>
            </div>
            <div className={styles.socialLinks}>
                <a
                    href="https://instagram.com/sanyang"
                    className={styles.socialLink}
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://twitter.com/sanyang"
                    className={styles.socialLink}
                    aria-label="Twitter"
                >
                    <FaTwitter />
                </a>
                <a
                    href="https://facebook.com/sanyang"
                    className={styles.socialLink}
                    aria-label="Facebook"
                >
                    <FaFacebookF />
                </a>
            </div>
        </footer>
    )
}

export default Footer
