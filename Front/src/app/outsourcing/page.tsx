import { workInfo } from '@/utils/api/DTO/work'
import { getWorkList } from '@/utils/api/work'
import ClientPage from './clientPage'

const fetchWorks = async () => {
    try {
        const { data } = await getWorkList()
        return splitData(data)
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
                workId: (item.workId ?? 0) * -1,
                userId: item.userId,
                uploadDate: item.uploadDate,
                tags: item.tags,
                original: item.original,
                thumbnail: item.thumbnail,
            }
            splitEntries.push(baseEntry)

            const workDetails = {
                workId: item.workId,
                company: item.company,
                title: item.title,
                startDate: item.startDate,
                endDate: item.endDate,
            }
            splitEntries.push(workDetails)
        } else {
            const workDetails = {
                workId: item.workId,
                company: item.company,
                title: item.title,
                startDate: item.startDate,
                endDate: item.endDate,
            }
            splitEntries.push(workDetails)

            const baseEntry = {
                workId: (item.workId ?? 0) * -1,
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

const OutsourcingPage: React.FC = async () => {
    const works = (await fetchWorks()) || []
    return <ClientPage works={works} />
}

export default OutsourcingPage
