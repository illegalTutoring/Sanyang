import React, { useState, useEffect } from 'react'
import styles from './Banner.module.scss'
import Modal from '@/component/layout/Modal'
import ImageUploadPreview from '@/component/ImageUploadPreview'

interface BannerProps {
    images: string[]
    yindex: number[]
    interval: number
    width?: string
    height?: string
    isEditMode: boolean
    isDarkMode: boolean
}

const Banner: React.FC<BannerProps> = ({
    images,
    yindex,
    interval,
    width = '100%',
    height = '300px',
    isEditMode = false,
    isDarkMode,
}) => {
    const extendedImages = [...images, images[0]]
    const extendedYIndex = [...yindex, yindex[0]]
    const [currentIdx, setCurrentIdx] = useState(0)
    const [transitionEnabled, setTransitionEnabled] = useState(true)
    const [editBanner, setEditBanner] = useState(false)

    const toggleEditBanner = () => setEditBanner(!editBanner)

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
    }, [currentIdx, extendedImages.length, interval, transitionEnabled])

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
                {extendedImages.map((image, index) => (
                    <div
                        key={index}
                        className={styles.imageItem}
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundPositionY: `${extendedYIndex[index]}px`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: `${100 / images.length}%`,
                            height: '100%',
                        }}
                    />
                ))}
            </div>
            {isEditMode && (
                <>
                    <img
                        className={styles.editButton}
                        src={
                            isDarkMode
                                ? '/svgs/edit_white.svg'
                                : '/svgs/edit_black.svg'
                        }
                        alt="Edit"
                        onClick={toggleEditBanner}
                    />
                    <Modal
                        isVisible={editBanner}
                        toggleModal={toggleEditBanner}
                        width="60vw"
                        height="60vh"
                    >
                        <ImageUploadPreview />
                    </Modal>
                </>
            )}
        </div>
    )
}

export default Banner
