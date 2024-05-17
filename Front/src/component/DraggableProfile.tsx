import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Profile from '@/component/Profile'
import useDarkModeStore from '@/utils/store/useThemaStore'
import styles from './DraggableProfile.module.scss'
import { motion } from 'framer-motion'
import { embedLinkInfo } from '@/utils/api/DTO/embed'

interface ProfileComponentProps {
    item: embedLinkInfo
    index: number
    moveProfile: (dragIndex: number, hoverIndex: number) => void
}

const DraggableProfile: React.FC<ProfileComponentProps> = ({
    item,
    index,
    moveProfile,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const { isDarkMode } = useDarkModeStore()

    const getImageSource = (type: number) => {
        switch (type) {
            case 0:
                return isDarkMode
                    ? '/svgs/youtube_white.svg'
                    : '/svgs/youtube_black.svg'
            case 1:
                return isDarkMode
                    ? '/svgs/blog_white.svg'
                    : '/svgs/blog_black.svg'
            case 2:
                return isDarkMode
                    ? '/svgs/instagram_white.svg'
                    : '/svgs/instagram_black.svg'
            case 3:
                return isDarkMode
                    ? '/svgs/twitter_white.svg'
                    : '/svgs/twitter_black.svg'
            case 4:
                return isDarkMode
                    ? '/svgs/artstation_white.svg'
                    : '/svgs/artstation_black.svg'
            case 5:
                return isDarkMode
                    ? '/svgs/pixiv_white.svg'
                    : '/svgs/pixiv_black.svg'
            case 6:
                return isDarkMode
                    ? '/svgs/etc_white.svg'
                    : '/svgs/etc_black.svg'
            default:
                return ''
        }
    }

    const [{ isDragging }, drag] = useDrag({
        type: 'profile',
        item: () => ({ id: item.type, index }),
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    })

    const [, drop] = useDrop({
        accept: 'profile',
        hover(item: { id: string; index: number }, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()

            if (clientOffset) {
                const hoverClientY = clientOffset.y - hoverBoundingRect.top

                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return
                }

                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return
                }

                moveProfile(dragIndex, hoverIndex)
                item.index = hoverIndex
            }
        },
    })

    drag(drop(ref))

    const opacity = isDragging ? 0 : 1
    const variants = {
        first: { scale: 0.6 },
        animationEnd: { scale: 1 },
    }

    return (
        <motion.div
            ref={ref}
            variants={variants}
            transition={{
                ease: 'easeInOut',
                duration: 0.3,
            }}
            initial="first"
            animate="animationEnd"
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            style={{ opacity: opacity }}
            className={styles.embedLink}
        >
            <Profile src={getImageSource(item.type)} size={70} />
        </motion.div>
    )
}

export default DraggableProfile
