'use client'

import Gallery from '@/component/Gallery'
import GridGallery from '@/component/GridGallery'
import TagInput from '@/component/TagInput'
import useDarkModeStore from '@/utils/store/useThemaStore'

const OutsourcingPage = () => {
    const { isDarkMode } = useDarkModeStore()

    const defaultImages = [
        {
            workId: 2,
            userId: 'sanyang',
            title: 'd&f 캐릭터 작업',
            startDate: '2024-04-01',
            endDate: '2024-04-30',
            uploadDate: '2024-04-12 12:12:12',
            tags: ['d&f', '캐릭터'],
            original: 's3 path',
            thumbnail:
                'https://pbs.twimg.com/media/FhdMW1daAAEtiR8?format=jpg&name=large',
        },
        {
            company: 'd&f 캐릭터 작업',
            userId: 'sanyang',
            title: 'd&f 캐릭터 작업',
            startDate: '2024-04-01',
            endDate: '2024-04-30',
            uploadDate: '2024-04-12 12:12:12',
            tags: ['d&f', '캐릭터'],
            original: 's3 path',
            thumbnail:
                'https://pbs.twimg.com/media/FhdMW1daAAEtiR8?format=jpg&name=large',
        },
        {
            company: '메이플 캐릭터 작업',
            userId: 'sanyang',
            title: 'd&f 캐릭터 작업',
            startDate: '2024-04-01',
            endDate: '2024-04-30',
            uploadDate: '2024-04-12 12:12:12',
            tags: ['d&f', '캐릭터'],
            original: 's3 path',
            thumbnail:
                'https://pbs.twimg.com/media/Fenjik9aMAA-oYi?format=jpg&name=small',
        },
        {
            workId: 2,
            userId: 'sanyang',
            title: 'd&f 캐릭터 작업',
            startDate: '2024-04-01',
            endDate: '2024-04-30',
            uploadDate: '2024-04-12 12:12:12',
            tags: ['d&f', '캐릭터'],
            original: 's3 path',
            thumbnail:
                'https://pbs.twimg.com/media/Fenjik9aMAA-oYi?format=jpg&name=small',
        },
    ]

    const tags = [
        'apple',
        'alalal',
        'apricot',
        'avocado',
        'acai',
        'acerola',
        'anchovy',
        'antelope',
        'ant',
        'anaconda',
        'asteroid',
        'aster',
        'aspen',
        'amethyst',
        'amber',
        'arrow',
        'armor',
        'amphibian',
        'aluminum',
        'arsenic',
        'apartment',
        'avenue',
        'answer',
        'astronomy',
        'algebra',
        'artifact',
        'alchemy',
        'angle',
        'argyle',
        'ascot',
        'artifact',
        'aviation',
        'aviary',
        'axis',
    ]

    return (
        <article className={`${isDarkMode ? 'dark' : 'light'}`}>
            <div>
                <div>
                    <GridGallery
                        images={defaultImages}
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
