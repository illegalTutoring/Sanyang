import { ReactNode } from 'react'
import styles from './Modal.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'

interface ModalProps {
    width?: string
    height?: string
    minWidth?: string
    maxHeight?: string
    children: ReactNode
    isVisible: boolean
    toggleModal: () => void
}

const Modal: React.FC<ModalProps> = ({
    width = '80vw',
    height = '80vh',
    minWidth = '300px',
    maxHeight = '600px',
    children,
    isVisible,
    toggleModal,
}) => {
    const { isDarkMode } = useDarkModeStore()

    return (
        <>
            {isVisible && (
                <div className={styles.backdrop} onClick={toggleModal}>
                    <div
                        className={`${styles.modal} ${isDarkMode ? 'dark' : 'light'}`}
                        style={{ width, height, minWidth, maxHeight }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                        <div
                            onClick={toggleModal}
                            className={styles.closeButton}
                        >
                            X
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
