import React, { useState, useEffect } from 'react'
import styles from './BannerEditor.module.scss'

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
    isDarkMode: boolean
}

const BannerEditor: React.FC<BannerEditorProps> = ({
    fetchImages,
    updateImages,
    toggleEditBanner,
    isDarkMode,
}) => {
    // 지역변수
    const [files, setFiles] = useState<File[]>([])
    const [previewImgs, setPreviewImgs] = useState<PreviewImg[]>([])
    const [defaultItem, setDefaultItem] = useState<boolean>(true)
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
                setDefaultItem(false) // 새로운 파일이 추가되면 기본 항목을 숨김
            }
        }
    }

    const removeFileHandler = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
        setPreviewImgs((prevImgs) => prevImgs.filter((_, i) => i !== index))
        if (files.length === 1) {
            setDefaultItem(true) // 마지막 파일이 삭제되면 기본 항목을 표시
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

        const columns = `repeat(${files.length}, 1fr)`
        setGridTemplateColumns(columns)
    }, [files])

    // useEffect(() => {
    //     const onMouseMove = (event: MouseEvent) => {
    //         if (dragIndex !== null) {
    //             let deltaY = event.clientY - startY

    //             deltaY = Math.max(-50, Math.min(50, deltaY))

    //             setPreviewImgs((prev) =>
    //                 prev.map((preview, idx) => {
    //                     if (idx === dragIndex) {
    //                         return {
    //                             ...preview,
    //                             yindex: startTopOffset + deltaY,
    //                         }
    //                     }
    //                     return preview
    //                 }),
    //             )
    //         }
    //     }

    //     const onMouseUp = () => {
    //         setDragIndex(null)
    //         window.removeEventListener('mousemove', onMouseMove)
    //         window.removeEventListener('mouseup', onMouseUp)
    //     }

    //     if (dragIndex !== null) {
    //         window.addEventListener('mousemove', onMouseMove)
    //         window.addEventListener('mouseup', onMouseUp)
    //     }

    //     return () => {
    //         window.removeEventListener('mousemove', onMouseMove)
    //         window.removeEventListener('mouseup', onMouseUp)
    //     }
    // }, [dragIndex, startY, startTopOffset])

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
        <div className={styles.bannerEditContainer}>
            <div className={styles.bannerEditContent}>
                {defaultItem ? (
                    <div
                        className={styles.bannerEditItem}
                        style={{
                            backgroundColor: isDarkMode
                                ? 'rgba(255,255,255,0.1)'
                                : 'rgba(0,0,0,0.2)',
                        }}
                    >
                        버튼을 눌러 이미지를 추가해주세요
                    </div>
                ) : (
                    previewImgs.map((preview, index) => (
                        <div
                            key={preview.name}
                            className={styles.bannerEditItem}
                            style={{
                                backgroundColor: isDarkMode
                                    ? 'rgba(255,255,255,0.1)'
                                    : 'rgba(0,0,0,0.2)',
                            }}
                        >
                            {preview.name}
                            <img
                                onClick={() => removeFileHandler(index)}
                                style={{ width: '30px' }}
                                src={'/svgs/delete_red.svg'}
                                alt="Delete"
                            />
                        </div>
                    ))
                )}
            </div>
            <div className={styles.bannerEditButton}>
                <button
                    className={styles.blueButton}
                    onClick={() =>
                        document.getElementById('fileInput')?.click()
                    }
                >
                    <img
                        style={{ width: '16px' }}
                        src="/svgs/image_plus_white.svg"
                    />
                    추가
                </button>
                <input
                    id="fileInput"
                    type="file"
                    onChange={filesChangedHandler}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <button className={styles.redButton} onClick={handleSubmit}>
                    저장
                </button>
            </div>
        </div>
    )
}

export default BannerEditor
