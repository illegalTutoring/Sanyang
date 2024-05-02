import React, { useState, useEffect } from 'react'
import styles from './Banner.module.scss'
import Modal from '@/component/layout/Modal';
import ImageUploadPreview from '@/component/ImageUploadPreview';

interface BannerProps {
    images: string[];
    yindex: number[];
    interval: number;
    width?: string;
    height?: string;
    isEditMode: boolean;
}

const Banner: React.FC<BannerProps> = ({
    images,
    yindex,
    interval,
    width = '100%',
    height = '300px',
    isEditMode = false
}) => {
    const extendedImages = [...images, images[0]];
    const extendedYIndex = [...yindex, yindex[0]];
    const [currentIdx, setCurrentIdx] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [editBanner, setEditBanner] = useState(false);

    const toggleEditBanner = () => setEditBanner(!editBanner);

    useEffect(() => {
        const timer = setInterval(
            () => {
                const nextIdx = (currentIdx + 1) % extendedImages.length;

                if (nextIdx === 0) {
                    setTransitionEnabled(false);
                    setCurrentIdx(0);
                } else {
                    setCurrentIdx(nextIdx);
                    setTransitionEnabled(true);
                }
            },
            transitionEnabled ? interval : 200,
        );

        return () => clearInterval(timer);
    }, [currentIdx, extendedImages.length, interval, transitionEnabled]);

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
                    <button
                        onClick={toggleEditBanner}
                        className={styles.editButton}
                        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                        aria-label="Edit Banner"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4 20.9999V23.9999H7L17.87 13.1299L14.87 10.1299L4 20.9999ZM19.04 7.05991C19.62 6.47991 19.62 5.51991 19.04 4.93991L18.06 3.95991C17.48 3.37991 16.52 3.37991 15.94 3.95991L13.91 5.98991L18.01 10.0899L19.04 7.05991Z" fill="#000000"/>
                        </svg>
                    </button>
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
