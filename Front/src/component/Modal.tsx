import { ReactNode } from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
    width?: string
    height?: string
    children: ReactNode
    isVisible: boolean
    toggleModal: () => void
}

const Modal: React.FC<ModalProps> = ({
    width = '80vw',
    height = '80vh',
    children,
    isVisible,
    toggleModal,
}) => {
    return (
        <>
            {isVisible && (
                <div className={styles.backdrop} onClick={toggleModal}>
                    <div
                        className={styles.modal}
                        style={{ width, height }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                        <button
                            onClick={toggleModal}
                            className={styles.closeButton}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
