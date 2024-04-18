'use client'

import React, { useState, useEffect } from 'react'

interface BannerProps {
    images: string[]
    interval: number
    width?: string
    height?: string
}

const Banner: React.FC<BannerProps> = ({
    images,
    interval,
    width = '100%',
    height = '300px',
}) => {
    const [currentIdx, setCurrentIdx] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIdx((prevIdx) => (prevIdx + 1) % images.length)
        }, interval)

        return () => clearInterval(timer)
    }, [images.length, interval])

    return (
        <div style={{ width, height, overflow: 'hidden' }}>
            <img
                src={images[currentIdx]}
                alt="Banner Image"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    )
}

export default Banner
