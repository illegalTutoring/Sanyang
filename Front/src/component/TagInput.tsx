import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react'
import styles from './TagInput.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'
import { makeTagListByTagString } from '@/app/gallery/clientPage'

interface TagInputProps {
    availableTags: string[]
    tagString: string
}

const TagInput: React.FC<TagInputProps> = ({ availableTags, tagString }) => {
    const { isDarkMode } = useDarkModeStore()
    const [tags, setTags] = useState<string[]>(
        makeTagListByTagString(tagString),
    )
    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>(availableTags)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (
                containerRef.current &&
                !containerRef.current.contains(target)
            ) {
                setSuggestions(
                    availableTags.filter((tag) => !tags.includes(tag)),
                )
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        setInput(inputValue)

        if (inputValue) {
            const filteredSuggestions = availableTags.filter(
                (tag) =>
                    tag.toLowerCase().startsWith(inputValue.toLowerCase()) &&
                    !tags.includes(tag),
            )
            setSuggestions(filteredSuggestions)
            setSelectedIndex(0)
        } else {
            setSuggestions(availableTags.filter((tag) => !tags.includes(tag)))
        }
    }

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Enter':
                if (
                    input &&
                    suggestions.length > 0 &&
                    suggestions[selectedIndex]
                ) {
                    selectTag(suggestions[selectedIndex], selectedIndex)
                }
                break
            case 'ArrowUp':
                if (selectedIndex > 0) {
                    setSelectedIndex(selectedIndex - 1)
                    scrollIntoSelectedItem(selectedIndex - 2)
                }
                event.preventDefault()
                break
            case 'ArrowDown':
                if (selectedIndex < suggestions.length - 1) {
                    setSelectedIndex(selectedIndex + 1)
                    scrollIntoSelectedItem(selectedIndex + 2)
                }
                event.preventDefault()
                break
            default:
                break
        }
    }

    const scrollIntoSelectedItem = (index: number) => {
        const element = document.querySelector(`#suggestion-item-${index}`)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
    }

    const selectTag = (tag: string, index: number) => {
        if (!tags.includes(tag)) {
            // setTags([...tags, tag])
            // setSuggestions([])

            // const updatedSuggestions = suggestions.filter(
            //     (suggestion) => suggestion !== tag,
            // )
            // setSuggestions(updatedSuggestions)

            tags.push(tag)
            setInput('')
            setSuggestions(availableTags.filter((tag) => !tags.includes(tag)))
            inputRef.current?.focus()
            setSelectedIndex(index)
        }
    }

    const deleteTag = (tagToDelete: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToDelete)
        setTags(updatedTags)

        if (
            availableTags.includes(tagToDelete) &&
            tagToDelete.toLowerCase().startsWith(input.toLowerCase())
        ) {
            const originalIndex = availableTags.indexOf(tagToDelete)
            const updatedSuggestions = [...suggestions]
            const nextIndex = updatedSuggestions.findIndex(
                (suggestion) =>
                    availableTags.indexOf(suggestion) > originalIndex,
            )
            if (nextIndex === -1) {
                updatedSuggestions.push(tagToDelete)
            } else {
                updatedSuggestions.splice(nextIndex, 0, tagToDelete)
            }
            setSuggestions(updatedSuggestions)
        }
    }

    const deleteAllTag = () => {
        setTags([])
        setSuggestions([])
        setInput('')
    }

    const searchByTag = () => {}

    return (
        <div ref={containerRef}>
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
                    <div
                        className={styles.resetButton}
                        onClick={() => deleteAllTag()}
                    >
                        <img
                            style={{ height: '40px' }}
                            src="/svgs/restart.svg"
                        ></img>
                    </div>
                </div>

                <div className={styles.inputBox}>
                    {suggestions.length > 0 && (
                        <ul className={styles.suggestions}>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    id={`suggestion-item-${index}`}
                                    key={index}
                                    onClick={() => selectTag(suggestion, index)}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor:
                                            index === selectedIndex
                                                ? 'lightgray'
                                                : 'transparent',
                                        padding: '10px',
                                        borderBottom: '1px solid #eee',
                                    }}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TagInput
