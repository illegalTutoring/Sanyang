import React, { useState } from 'react'
import styles from './EditableBanner.module.scss'

// 컴포넌트
import Banner from '@/component/banner/Banner'
import Modal from '@/component/layout/Modal'
import BannerEditor from '@/component/banner/BannerEditor'

export interface Images {
    url: string
    yindex: number
}

interface EditableBannerProps {
    width: string
    height: string
    images: Images[]
    interval: number
    isEditMode: boolean
    isDarkMode: boolean
}

const EditableBanner: React.FC<EditableBannerProps> = ({
    width,
    height,
    images,
    interval,
    isEditMode,
    isDarkMode,
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
                        width="60vw"
                        height="60vh"
                    >
                        <BannerEditor />
                    </Modal>
                </>
            )}
        </div>
    )
}

export default EditableBanner
