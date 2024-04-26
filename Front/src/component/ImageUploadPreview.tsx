import { useState, useEffect } from 'react'

type PreviewUrl = {
    name: string
    url: string
}

const MultipleImageUploadPreview = () => {
    const [files, setFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<PreviewUrl[]>([])

    useEffect(() => {
        if (!files.length) {
            setPreviewUrls([])
            return
        }

        const newPreviewUrls: PreviewUrl[] = []
        files.forEach((file) => {
            const fileReader = new FileReader()
            fileReader.onload = () => {
                newPreviewUrls.push({
                    name: file.name,
                    url: fileReader.result as string,
                })
                if (newPreviewUrls.length === files.length) {
                    setPreviewUrls(newPreviewUrls)
                }
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

    const gridTemplateColumns = `repeat(${files.length}, 1fr)`

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
                    gridTemplateColumns,
                    gap: 10,
                }}
            >
                {previewUrls.map((preview) => (
                    <div key={preview.name}>
                        <img
                            src={preview.url}
                            alt={`Preview of ${preview.name}`}
                            style={{ width: 100, height: 100 }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MultipleImageUploadPreview
