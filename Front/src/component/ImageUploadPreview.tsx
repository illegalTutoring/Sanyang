import React, { useState, useEffect } from 'react'

type PreviewImg = {
    name: string
    url: string
    yindex: number
}

interface MultipleImageUploadPreviewProps {}

const MultipleImageUploadPreview: React.FC<
    MultipleImageUploadPreviewProps
> = () => {
    const [files, setFiles] = useState<File[]>([])
    const [dragIndex, setDragIndex] = useState<number>(0)

    const [previewImgs, setPreviewImgs] = useState<PreviewImg[]>([])

    const [startY, setStartY] = useState<number>(0)
    const [startTopOffset, setStartTopOffset] = useState<number>(0)

    useEffect(() => {
        if (!files.length) {
            setPreviewImgs([])
            return
        }

        const newPreviewImgs = files.map((file) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            return {
                name: file.name,
                url: '',
                yindex: 0,
            }
        })
        files.forEach((file, index) => {
            const fileReader = new FileReader()
            fileReader.onload = () => {
                newPreviewImgs[index].url = fileReader.result as string
                setPreviewImgs([...newPreviewImgs])
            }
            fileReader.readAsDataURL(file)
        })
    }, [files])

    const filesChangedHandler = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files))
        }
    }

    const startDrag = (
        index: number,
        event: React.MouseEvent<HTMLImageElement>,
    ) => {
        setDragIndex(index)
        setStartY(event.clientY)
        setStartTopOffset(previewImgs[index].yindex)
        event.preventDefault()
    }

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            if (dragIndex !== null) {
                const deltaY = event.clientY - startY
                setPreviewImgs((prev) =>
                    prev.map((preview, idx) => {
                        if (idx === dragIndex) {
                            return {
                                ...preview,
                                yindex: startTopOffset + deltaY,
                            }
                        }
                        return preview
                    }),
                )
            }
        }

        const onMouseUp = () => {
            setDragIndex(null)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }

        if (dragIndex !== null) {
            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', onMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [dragIndex, startY, startTopOffset])

    return (
        <div>
            <input
                type="file"
                onChange={filesChangedHandler}
                accept="image/*"
                multiple
            />
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${files.length}, 1fr)`,
                    gap: 10,
                    position: 'relative',
                }}
            >
                {previewImgs.map((preview, index) => (
                    <div
                        key={preview.name}
                        style={{ position: 'relative', cursor: 'ns-resize' }}
                    >
                        <img
                            src={preview.url}
                            alt={`Preview of ${preview.name}`}
                            style={{
                                width: 100,
                                height: 100,
                                position: 'relative',
                                top: `${preview.yindex}px`,
                            }}
                            onMouseDown={(e) => startDrag(index, e)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MultipleImageUploadPreview
