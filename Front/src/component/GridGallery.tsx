import React from 'react'

export interface ImageData {
    id: number
    url: string
    title: string
}

export interface GalleryProps {
    images: ImageData[]
    colCount: number
    width?: string
    height?: string
}

const GridGallery: React.FC<GalleryProps> = ({
    images,
    colCount,
    width,
    height,
}) => {
    const gridTemplateColumns = `repeat(${colCount}, 1fr)`

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns,
                gap: '10px',
                height: height,
                width: width,
            }}
        >
            {images.map((image) => (
                <div
                    key={image.id}
                    style={{
                        overflow: 'hidden',
                        width: '100%',
                        height: height,
                    }}
                >
                    <img
                        src={image.url}
                        alt={image.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    <p>{image.title}</p>
                </div>
            ))}
        </div>
    )
}

export default GridGallery
