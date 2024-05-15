import React, { useState, useEffect } from 'react'

// interfaces

type PreviewImg = {
    name: string
    url: string
    yindex: number
}

interface imageInfo {
    coordinateX: number
    coordinateY: number
}

export interface modifyBannerListRequestDTO {
    images: Array<File>
    infos: Array<imageInfo>
}

interface BannerEditorProps {
    fetchImages: () => void
    updateImages: (images: modifyBannerListRequestDTO) => void
    toggleEditBanner: () => void
}

const BannerEditor: React.FC<BannerEditorProps> = ({
    fetchImages,
    updateImages,
    toggleEditBanner,
}) => {
    // 지역변수
    const [files, setFiles] = useState<File[]>([])
    const [previewImgs, setPreviewImgs] = useState<PreviewImg[]>([])
    const [dragIndex, setDragIndex] = useState<number | null>(null)
    const [startY, setStartY] = useState<number>(0)
    const [startTopOffset, setStartTopOffset] = useState<number>(0)
    const [gridTemplateColumns, setGridTemplateColumns] = useState<string>(
        'repeat(auto-fill, 150px)',
    )

    // 함수

    const filesChangedHandler = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.files) {
            const newFile = event.target.files[0]
            if (newFile) {
                setFiles((prevFiles) => [...prevFiles, newFile])
            }
        }
    }

    const removeFileHandler = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
        setPreviewImgs((prevImgs) => prevImgs.filter((_, i) => i !== index))
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

    // 훅
    useEffect(() => {
        if (!files.length) {
            setPreviewImgs([])
            setGridTemplateColumns('repeat(auto-fill, 150px)')
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

        const columns = `repeat(${files.length + 1}, 1fr)`
        setGridTemplateColumns(columns)
    }, [files])

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

    const convertPreviewImgsToRequestDTO = (
        previews: PreviewImg[],
        files: File[],
    ): modifyBannerListRequestDTO => {
        const infos: imageInfo[] = previews.map((preview) => ({
            coordinateX: 0,
            coordinateY: preview.yindex,
        }))

        return {
            images: files,
            infos: infos,
        }
    }

    const handleSubmit = () => {
        const requestDTO = convertPreviewImgsToRequestDTO(previewImgs, files)
        updateImages(requestDTO)
        toggleEditBanner()

        console.log(requestDTO)
    }

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: gridTemplateColumns,
                    gap: '0px',
                }}
            >
                {previewImgs.map((preview, index) => (
                    <div key={preview.name} style={{ position: 'relative' }}>
                        <img
                            src={preview.url}
                            alt={`Preview of ${preview.name}`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                position: 'relative',
                                top: `${preview.yindex}px`,
                                cursor: 'ns-resize',
                            }}
                            onMouseDown={(e) => startDrag(index, e)}
                        />
                        <button
                            style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                            }}
                            onClick={() => removeFileHandler(index)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <button
                        onClick={() =>
                            document.getElementById('fileInput')?.click()
                        }
                    >
                        +
                    </button>
                </div>
            </div>
            <input
                id="fileInput"
                type="file"
                onChange={filesChangedHandler}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default BannerEditor
