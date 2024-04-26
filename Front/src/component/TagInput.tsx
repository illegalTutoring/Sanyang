import { useState, ChangeEvent, KeyboardEvent } from 'react'

interface TagInputProps {
    availableTags: string[]
}

const TagInput: React.FC<TagInputProps> = ({ availableTags }) => {
    const [tags, setTags] = useState<string[]>([])
    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        setInput(inputValue)

        if (inputValue) {
            const filteredSuggestions = availableTags.filter((tag) =>
                tag.toLowerCase().startsWith(inputValue.toLowerCase()),
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
                    selectTag(suggestions[selectedIndex])
                }
                break
            case 'ArrowUp':
                if (selectedIndex > 0) {
                    setSelectedIndex(selectedIndex - 1)
                }
                event.preventDefault()
                break
            case 'ArrowDown':
                if (selectedIndex < suggestions.length - 1) {
                    setSelectedIndex(selectedIndex + 1)
                }
                event.preventDefault()
                break
            default:
                break
        }
    }

    const selectTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag])
            setInput('')
            setSuggestions([])
        }
    }

    return (
        <div>
            <div>
                {tags.map((tag, index) => (
                    <span key={index} style={{ marginRight: '10px' }}>
                        {tag}
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Add a tag..."
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => selectTag(suggestion)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor:
                                    index === selectedIndex
                                        ? 'lightgray'
                                        : 'transparent',
                            }}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TagInput
