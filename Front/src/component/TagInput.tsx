import { useState, ChangeEvent, KeyboardEvent, useRef } from 'react'
import styles from './TagInput.module.scss'

interface TagInputProps {
    availableTags: string[]
}

const TagInput: React.FC<TagInputProps> = ({ availableTags }) => {
    const [tags, setTags] = useState<string[]>([])
    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const inputRef = useRef<HTMLInputElement>(null)

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
            setSuggestions([])
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
            setTags([...tags, tag])
            setSuggestions([])

            const updatedSuggestions = suggestions.filter(
                (suggestion) => suggestion !== tag,
            )
            setSuggestions(updatedSuggestions)

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

    return (
        <div>
            <div className={styles.tagBox}>
                {tags.map((tag, index) => (
                    <div className={styles.tag} key={index}>
                        {tag}
                        <button
                            className={styles.deleteButton}
                            onClick={() => deleteTag(tag)}
                            aria-label="Delete tag"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.inputBox}>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Add a tag..."
                />
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
    )
}

export default TagInput
