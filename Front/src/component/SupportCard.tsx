import React from 'react'
import styles from './SupportCard.module.scss'

interface SupportLink {
    name: string
    link: string
}

interface SupportItem {
    supportId: number
    thumbnail: string
    title: string
    uploadDate: string
    supportLink: SupportLink[]
    content: string
}

interface SupportProps {
    items: SupportItem[]
    isEditMode: boolean
    isDarkMode: boolean
    width?: string
    height?: string
    cardMinWidth?: string
    cardMaxWidth?: string
}

const SupportCard: React.FC<SupportProps> = ({
    items,
    isEditMode,
    isDarkMode,
    width = '100%',
    height = 'auto',
    cardMinWidth = '350px',
    cardMaxWidth = '1fr',
}) => {
    const currentDate = new Date().toISOString().slice(0, 7)

    return (
        <div
            className={`${isDarkMode ? 'dark' : 'light'}`}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fit, minmax(${cardMinWidth || '250px'}, ${cardMaxWidth || '1fr'}))`,
                gridGap: '20px',
                width: width,
                height: height,
                padding: '10px',
            }}
        >
            {items.map((item) => (
                <div
                    className={styles.card}
                    key={item.supportId}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        padding: '30px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '60px 1fr',
                        }}
                    >
                        <img
                            src={item.thumbnail}
                            alt={''}
                            style={{ width: '50px', height: '50px' }}
                        />
                        <div>
                            <div style={{ fontSize: '20px' }}>{item.title}</div>
                            <hr></hr>
                            <div className={styles.dateBox}>
                                <div>{item.uploadDate}</div>
                                {item.uploadDate === currentDate && (
                                    <div
                                        className={`${styles.supportTag} ${isDarkMode ? styles.supportTagDark : styles.supportTagLight}`}
                                    >
                                        New!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentBox}>{item.content}</div>
                    <div
                        className={`${styles.linkBox} ${isDarkMode ? styles.linkBoxDark : styles.linkBoxLight}`}
                    >
                        {item.supportLink.map((link, index) => (
                            <div className={styles.link} key={index}>
                                <a
                                    href={link.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        style={{ width: '13px' }}
                                        src={
                                            isDarkMode
                                                ? '/svgs/diamond_white.svg'
                                                : '/svgs/diamond_black.svg'
                                        }
                                    ></img>{' '}
                                    {link.name}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SupportCard
