import { ReactNode, useState } from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
    width?: string
    height?: string
    children: ReactNode
}

const Modal: React.FC<ModalProps> = ({
    width = '80vw',
    height = '80vh',
    children,
}) => {
    const [isVisible, setIsVisible] = useState(false)

    const showModal = () => setIsVisible(true)
    const hideModal = () => setIsVisible(false)

    return (
        <>
            <button onClick={showModal}>Open Modal</button>
            {isVisible && (
                <div className={styles.backdrop} onClick={hideModal}>
                    <div
                        className={styles.modal}
                        style={{ width, height }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                        <button
                            onClick={hideModal}
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
