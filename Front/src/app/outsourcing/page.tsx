'use client'

import Gallery from '@/component/Gallery'
import GridGallery from '@/component/GridGallery'
import TagInput from '@/component/TagInput'
import { workInfo } from '@/utils/api/DTO/work'
import { getWorkList } from '@/utils/api/work'
import useDarkModeStore from '@/utils/store/useThemaStore'
import { workStore } from '@/utils/store/useWorkStore'
import { useEffect } from 'react'

const defaultImages = getWorkList().data

const OutsourcingPage = () => {
    const { isDarkMode } = useDarkModeStore()

    useEffect(() => {
        workStore.getState().setImages(defaultImages)
        workStore.getState().setTagList(defaultImages)
    }, [])

    // 들어온 데이터
    // const defaultImages = [
    //     {
    //         workId: 1,
    //         userId: 'sanyang',
    //         company: 'd&f 캐릭터 작업',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/FhdMW1daAAEtiR8?format=jpg&name=large',
    //     },
    //     {
    //         workId: 2,
    //         userId: 'sanyang',
    //         company: '메이플 캐릭터 작업',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/Fenjik9aMAA-oYi?format=jpg&name=small',
    //     },
    // ]

    // 데이터 처리함수
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

    // 처리된 데이터
    const data = splitData(defaultImages)

    // const tags = [
    //     'apple',
    //     'alalal',
    //     'apricot',
    //     'avocado',
    //     'acai',
    //     'acerola',
    //     'anchovy',
    //     'antelope',
    //     'ant',
    //     'anaconda',
    //     'asteroid',
    //     'aster',
    //     'aspen',
    //     'amethyst',
    //     'amber',
    //     'arrow',
    //     'armor',
    //     'amphibian',
    //     'aluminum',
    //     'arsenic',
    //     'apartment',
    //     'avenue',
    //     'answer',
    //     'astronomy',
    //     'algebra',
    //     'artifact',
    //     'alchemy',
    //     'angle',
    //     'argyle',
    //     'ascot',
    //     'artifact',
    //     'aviation',
    //     'aviary',
    //     'axis',
    // ]

    const tags = workStore.getState().tagList

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <div>
                <div>
                    <GridGallery
                        images={data}
                        width={'100%'}
                        height={'100%'}
                        colCount={2}
                    />
                </div>
            </div>
        </article>
    )
}

export default OutsourcingPage
