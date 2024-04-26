import React, { useState, useEffect } from 'react'
import styles from './Banner.module.scss'

interface BannerProps {
    images: string[]
    interval: number
    width?: string
    height?: string
}

const Banner: React.FC<BannerProps> = ({
    images,
    interval,
    width = '100%',
    height = '300px',
}) => {
    const extendedImages = [...images, images[0]]
    const [currentIdx, setCurrentIdx] = useState(0)
    const [transitionEnabled, setTransitionEnabled] = useState(true)

    useEffect(() => {
        const timer = setInterval(() => {
            const nextIdx = (currentIdx + 1) % extendedImages.length

            if (nextIdx === 0) {
                setTransitionEnabled(false)
                setCurrentIdx(0)
            } else {
                setCurrentIdx(nextIdx)
                setTransitionEnabled(true)
            }
        }, interval)

        return () => clearInterval(timer)
    }, [currentIdx, extendedImages.length, interval])

    return (
        <div className={styles.bannerContainer} style={{ width, height }}>
            <div
                className={styles.imagesWrapper}
                style={{
                    width: `${100 * images.length}%`,
                    transform: `translateX(-${currentIdx * (100 / images.length)}%)`,
                    transition: transitionEnabled
                        ? 'transform 0.5s ease-in-out'
                        : 'none',
                }}
            >
                {extendedImages.map((extendedImages, index) => (
                    <img
                        key={index}
                        src={extendedImages}
                        alt={`Banner Image ${index}`}
                        className={styles.imageItem}
                        style={{ width: `${100 / images.length}%` }}
                    />
                ))}
            </div>
        </div>
    )
}

export default Banner
