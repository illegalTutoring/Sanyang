import React, { useState } from 'react'

const SimpleForm: React.FC = () => {
    const [text, setText] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        alert('Submitted: ' + text)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="Enter text here..."
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    margin: '10px 0',
                    width: '300px',
                }}
            />
            <button
                type="submit"
                style={{ padding: '10px 15px', fontSize: '16px' }}
            >
                Send
            </button>
        </form>
    )
}

export default SimpleForm
