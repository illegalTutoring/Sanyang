import React, { useState, useEffect } from 'react'

type PreviewImg = {
    name: string
    url: string
    yindex: number
}

interface BannerEditorProps {
    addBanner: (images: PreviewImg[]) => void
}

const BannerEditor: React.FC<BannerEditorProps> = ({ addBanner }) => {
    const [files, setFiles] = useState<File[]>([])
    const [previewImgs, setPreviewImgs] = useState<PreviewImg[]>([])

    const [dragIndex, setDragIndex] = useState<number | null>(null)
    const [startY, setStartY] = useState<number>(0)
    const [startTopOffset, setStartTopOffset] = useState<number>(0)

    useEffect(() => {
        if (!files.length) {
            setPreviewImgs([])
            return
        }

        const newPreviewImgs = files.map((file, index) => {
            const fileReader = new FileReader()

            fileReader.onload = () => {
                newPreviewImgs[index].url = fileReader.result as string
                setPreviewImgs([...newPreviewImgs])
            }

            fileReader.readAsDataURL(file)

            return {
                name: file.name,
                url: '',
                yindex: 0,
            }
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
                let deltaY = event.clientY - startY

                deltaY = Math.max(-50, Math.min(50, deltaY))

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

    const handleSubmit = () => {
        // addBanner(previewImgs)

        console.log(previewImgs)
    }

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
                    gridTemplateColumns: 'repeat(auto-fill, 150px)',
                    gap: '0px',
                }}
            >
                {previewImgs.map((preview, index) => (
                    <img
                        key={preview.name}
                        src={preview.url}
                        alt={`Preview of ${preview.name}`}
                        style={{
                            width: '150px',
                            height: 'auto',
                            position: 'relative',
                            top: `${preview.yindex}px`,
                            cursor: 'ns-resize',
                        }}
                        onMouseDown={(e) => startDrag(index, e)}
                    />
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default BannerEditor
