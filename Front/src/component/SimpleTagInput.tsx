import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react'
import styles from './TagInput.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'

interface SimpleTagInputProps {
    tags: string[]
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}

const SimpleTagInput: React.FC<SimpleTagInputProps> = ({ tags, setTags }) => {
    const { isDarkMode } = useDarkModeStore()
    const [input, setInput] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && input) {
            selectTag(input)
        }
    }

    const selectTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag])
            setInput('')
        }
    }

    const deleteTag = (tagToDelete: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToDelete)
        setTags(updatedTags)
    }

    const deleteAllTag = () => {
        setTags([])
    }

    return (
        <div>
            <div
                className={`${styles.tagBox} ${isDarkMode ? styles.darkBox : styles.lightBox}`}
            >
                <div className={styles.tagContainer}>
                    {tags.map((tag, index) => (
                        <div
                            className={`${styles.tag} ${isDarkMode ? styles.darkTag : styles.lightTag}`}
                            key={index}
                        >
                            #{tag}
                            <button
                                className={`${styles.deleteButton} ${isDarkMode ? styles.darkDeleteButton : styles.lightDeleteButton}`}
                                onClick={() => deleteTag(tag)}
                                aria-label="Delete tag"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.searchBox}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder="검색할 태그..."
                    />
                    <div className={styles.resetButton} onClick={deleteAllTag}>
                        <img
                            style={{ height: '40px' }}
                            src="/svgs/restart.svg"
                            alt="reset"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimpleTagInput
