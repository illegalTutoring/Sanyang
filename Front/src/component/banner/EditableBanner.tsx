import React, { useState } from 'react'
import styles from './EditableBanner.module.scss'

// Conponents
import Banner from '@/component/banner/Banner'
import Modal from '@/component/layout/Modal'
import BannerEditor from '@/component/banner/BannerEditor'

// Interfaces
export interface Images {
    url: string
    yindex: number
}

interface imageInfo {
    coordinateX: number
    coordinateY: number
}

export interface modifyBannerListRequestDTO {
    images: Array<File>
    infos: Array<imageInfo>
}

interface EditableBannerProps {
    width: string
    height: string
    images: Images[]
    interval: number
    isEditMode: boolean
    isDarkMode: boolean
    fetchImages: () => void
    updateImages: (Images: modifyBannerListRequestDTO) => void
}

const EditableBanner: React.FC<EditableBannerProps> = ({
    width,
    height,
    images,
    interval,
    isEditMode,
    isDarkMode,
    fetchImages,
    updateImages,
}) => {
    const [editBanner, setEditBanner] = useState(false)
    const toggleEditBanner = () => setEditBanner(!editBanner)

    return (
        <div style={{ width, height, position: 'relative' }}>
            <Banner
                images={images}
                interval={interval}
                width="100%"
                height="100%"
            ></Banner>
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
                        width="fit-content"
                        height="fit-content"
                    >
                        <BannerEditor
                            fetchImages={fetchImages}
                            updateImages={updateImages}
                            toggleEditBanner={toggleEditBanner}
                            isDarkMode={isDarkMode}
                        />
                    </Modal>
                </>
            )}
        </div>
    )
}

export default EditableBanner
