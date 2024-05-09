import React, { useEffect, useState } from 'react'
import styles from './Banner.module.scss'

interface Images {
    url: string
    yindex: number
}

interface BannerProps {
    width: string
    height: string
    images: Images[]
    interval: number
}

const Banner: React.FC<BannerProps> = ({ width, height, images, interval }) => {
    const extendedImages = [...images, images[0]]

    const [currentIdx, setCurrentIdx] = useState(0)
    const [transitionEnabled, setTransitionEnabled] = useState(true)

    useEffect(() => {
        const timer = setInterval(
            () => {
                const nextIdx = (currentIdx + 1) % extendedImages.length

                if (nextIdx === 0) {
                    setTransitionEnabled(false)
                    setCurrentIdx(0)
                } else {
                    setCurrentIdx(nextIdx)
                    setTransitionEnabled(true)
                }
            },
            transitionEnabled ? interval : 200,
        )

        return () => clearInterval(timer)
    }, [currentIdx, extendedImages, interval, transitionEnabled])

    return (
        <div
            className={styles.container}
            style={{ width, height, backgroundColor: '#bbb' }}
        >
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
                {extendedImages.map((image, index) => (
                    <div
                        key={index}
                        className={styles.imageItem}
                        style={{
                            backgroundImage: `url(${image.url})`,
                            backgroundPositionY: `${image.yindex}px`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: `${100 / images.length}%`,
                            height: '100%',
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default Banner
