import React from 'react'

interface youtubeProps {
    url: string
    height: string
    text: string
}

const Youtube: React.FC<youtubeProps> = ({ url, height, text }) => {
    const handleClick = () => {
        window.location.href = url
    }

    return (
        <div
            onClick={handleClick}
            style={{
                height,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: '#f0f0f0',
                border: '1px solid #ddd',
                padding: '10px',
            }}
        >
            <img
                src={'/brand/youtube.png'}
                alt={text}
                style={{ height: '80%', marginRight: '20px' }}
            />
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {text}
            </span>
        </div>
    )
}

export default Youtube
