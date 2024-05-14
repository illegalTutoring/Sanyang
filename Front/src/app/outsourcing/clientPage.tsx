'use client'

import React from 'react'
import useEditModeStore from '@/utils/store/useEditModeStore'
import useDarkModeStore from '@/utils/store/useThemaStore'
import { workInfo } from '@/utils/api/DTO/work'
import { getWorkList } from '@/utils/api/work'
import { registWork, modifyWork, deleteWork } from '@/utils/api/admin'
import GridGallery from '@/component/GridGallery'

interface ClientPageProps {
    works: Array<workInfo>
}

const ClientPage: React.FC<ClientPageProps> = ({ works }) => {
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    const [worksData, setWorksData] = React.useState<Array<workInfo>>(works)

    const fetchWorks = () => {
        try {
            const { data } = getWorkList()
            setWorksData(splitData(data))
        } catch (error) {
            console.error('Error fetching works:', error)
        }
    }

    function splitData(data: Array<workInfo>) {
        const splitEntries: Array<workInfo> = []
        let left = 0

        data.forEach((item) => {
            left++
            if (left % 2 !== 0) {
                const baseEntry = {
                    workId: item.workId,
                    userId: item.userId,
                    uploadDate: item.uploadDate,
                    tags: item.tags,
                    original: item.original,
                    thumbnail: item.thumbnail,
                }
                splitEntries.push(baseEntry)

                const workDetails = {
                    company: item.company,
                    title: item.title,
                    startDate: item.startDate,
                    endDate: item.endDate,
                }
                splitEntries.push(workDetails)
            } else {
                const workDetails = {
                    company: item.company,
                    title: item.title,
                    startDate: item.startDate,
                    endDate: item.endDate,
                }
                splitEntries.push(workDetails)

                const baseEntry = {
                    workId: item.workId,
                    userId: item.userId,
                    uploadDate: item.uploadDate,
                    tags: item.tags,
                    original: item.original,
                    thumbnail: item.thumbnail,
                }
                splitEntries.push(baseEntry)
            }
        })

        return splitEntries
    }

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <div>
                <GridGallery
                    images={worksData}
                    width={'100%'}
                    height={'100%'}
                    colCount={2}
                    isDarkMode={isDarkMode}
                    isEditMode={isEditMode}
                    fetchGallery={fetchWorks}
                    addGallery={registWork}
                    updateGallery={modifyWork}
                    deleteGallery={deleteWork}
                ></GridGallery>
            </div>
        </article>
    )
}

export default ClientPage
