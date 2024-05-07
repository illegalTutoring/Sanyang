'use client'

import React, { useEffect, useState } from 'react'
import styles from './gallery.module.scss'
import Gallery from '@/component/Gallery'
import TagInput from '@/component/TagInput'
import Modal from '@/component/layout/Modal'
import GridGallery from '@/component/GridGallery'
import useDarkModeStore from '@/utils/store/useThemaStore'
import { getGalleryList } from '@/utils/api/gallery'

let defaultImages = getGalleryList().data
if (!defaultImages) {
    /**
     * @todo 이미지가 존재하지 않을 때 예외 처리
     */

    defaultImages = [
        {
            galleryId: 0,
            userId: '',
            title: '이미지가 존재하지 않습니다.',
            startDate: '',
            endDate: '',
            uploadDate: '',
            tags: [],
            original:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXe_Eo4HYEX6Ar1EOR3uZcth_gfwoHVR18AiHRaOvxyw&s',
            thumbnail:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXe_Eo4HYEX6Ar1EOR3uZcth_gfwoHVR18AiHRaOvxyw&s',
            watermark:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXe_Eo4HYEX6Ar1EOR3uZcth_gfwoHVR18AiHRaOvxyw&s',
        },
    ]
}
console.log(defaultImages)
/**
 * @todo Error Handling
 */

const GalleryPage = () => {
    const { isDarkMode } = useDarkModeStore()

    // const defaultImages = [
    //     {
    //         galleryId: 1,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/GEh332ebYAAwJxD?format=png&name=900x900',
    //         watermark: 's3 path watermark',
    //     },
    //     {
    //         galleryId: 2,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/FhdMW1daAAEtiR8?format=jpg&name=large',
    //         watermark: 's3 path watermark',
    //     },
    //     {
    //         galleryId: 3,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/GEh332ebYAAwJxD?format=png&name=900x900',
    //         watermark: 's3 path watermark',
    //     },
    //     {
    //         galleryId: 4,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/FhdMW1daAAEtiR8?format=jpg&name=large',
    //         watermark: 's3 path watermark',
    //     },
    //     {
    //         galleryId: 5,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/GEh332ebYAAwJxD?format=png&name=900x900',
    //         watermark: 's3 path watermark',
    //     },
    //     {
    //         galleryId: 6,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=large',
    //         watermark: 's3 path watermark',
    //     },
    //     {
    //         galleryId: 7,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/Ff2H_LQaEAE5Pi_?format=jpg&name=4096x4096',
    //         watermark: 's3 path watermark',
    //     },
    //     {
    //         galleryId: 8,
    //         userId: 'sanyang',
    //         title: 'd&f 캐릭터 작업',
    //         startDate: '2024-04-01',
    //         endDate: '2024-04-30',
    //         uploadDate: '2024-04-12 12:12:12',
    //         tags: ['d&f', '캐릭터'],
    //         original: 's3 path',
    //         thumbnail:
    //             'https://pbs.twimg.com/media/Fenjik9aMAA-oYi?format=jpg&name=small',
    //         watermark: 's3 path watermark',
    //     },
    // ]

    const defaultImages2 = defaultImages.slice(0, 4)

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
        <div className={`${styles.container} ${isDarkMode ? 'dark' : 'light'}`}>
            <div
                className={`${isDarkMode ? styles.darkGalleryWrapper : styles.lightGalleryWrapper}`}
            >
                <div style={{ fontSize: '25px', marginBottom: '5px' }}>
                    최신 업데이트
                </div>
                <GridGallery
                    images={defaultImages2}
                    width={'100%'}
                    height={'300px'}
                    colCount={defaultImages2.length}
                />
            </div>
            <div>
                <TagInput availableTags={tags} />
            </div>
            <div>
                <Gallery
                    images={defaultImages}
                    width={'100%'}
                    height={'400px'}
                    colCount={4}
                />
            </div>
        </div>
    )
}

export default GalleryPage
