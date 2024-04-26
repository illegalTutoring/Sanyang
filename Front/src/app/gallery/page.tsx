'use client'

import React, { useState } from 'react'
import styles from './gallery.module.scss'
import Gallery from '@/component/Gallery'
import TagInput from '@/component/TagInput'
import Modal from '@/component/Modal'
<<<<<<< HEAD
import useDarkModeStore from '@/utils/store/useThemaStore'
=======
import GridGallery from '@/component/GridGallery'
>>>>>>> fe/feature/gallery

const Home: React.FC = () => {
    const defaultImages = [
        {
            id: 1,
            url: 'https://pbs.twimg.com/media/Fenjik9aMAA-oYi?format=jpg&name=small',
            title: 'Image 1',
        },
        {
            id: 2,
            url: 'https://pbs.twimg.com/media/Ff2H_LQaEAE5Pi_?format=jpg&name=4096x4096',
            title: 'Image 2',
        },
        {
            id: 3,
            url: 'https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=large',
            title: 'Image 3',
        },
        {
            id: 4,
            url: 'https://pbs.twimg.com/media/GEh332ebYAAwJxD?format=png&name=900x900',
            title: 'Image 4',
        },
        {
            id: 5,
            url: 'https://pbs.twimg.com/media/FhdMW1daAAEtiR8?format=jpg&name=large',
            title: 'Image 4',
        },
        {
            id: 11,
            url: 'https://pbs.twimg.com/media/Fenjik9aMAA-oYi?format=jpg&name=small',
            title: 'Image 1',
        },
        {
            id: 12,
            url: 'https://pbs.twimg.com/media/Ff2H_LQaEAE5Pi_?format=jpg&name=4096x4096',
            title: 'Image 2',
        },
        {
            id: 13,
            url: 'https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=large',
            title: 'Image 3',
        },
        {
            id: 14,
            url: 'https://pbs.twimg.com/media/GEh332ebYAAwJxD?format=png&name=900x900',
            title: 'Image 4',
        },
        {
            id: 15,
            url: 'https://pbs.twimg.com/media/FhdMW1daAAEtiR8?format=jpg&name=large',
            title: 'Image 4',
        },
        {
            id: 16,
            url: 'https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=large',
            title: 'Image 3',
        },
        {
            id: 17,
            url: 'https://pbs.twimg.com/media/GEh332ebYAAwJxD?format=png&name=900x900',
            title: 'Image 4',
        },
        {
            id: 1,
            url: 'https://pbs.twimg.com/media/FhdMW1daAAEtiR8?format=jpg&name=large',
            title: 'Image 4',
        },
    ]

    const defaultImages2 = [
        {
            id: 1,
            url: 'https://pbs.twimg.com/media/Fenjik9aMAA-oYi?format=jpg&name=small',
            title: 'Image 1',
        },
        {
            id: 2,
            url: 'https://pbs.twimg.com/media/Ff2H_LQaEAE5Pi_?format=jpg&name=4096x4096',
            title: 'Image 2',
        },
        {
            id: 3,
            url: 'https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=large',
            title: 'Image 3',
        },
        {
            id: 4,
            url: 'https://pbs.twimg.com/media/GEh332ebYAAwJxD?format=png&name=900x900',
            title: 'Image 4',
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

    const { isDarkMode } = useDarkModeStore()

    return (
        <article
            className={`${styles.container} ${isDarkMode ? 'dark' : 'light'}`}
        >
            <div className={styles.galleryWrapper}>
                <GridGallery
                    images={defaultImages2}
                    colCount={4}
                    height="300px"
                />
            </div>
            <div>
                <TagInput availableTags={tags} />
            </div>
            <div>
                <Gallery images={defaultImages} colCount={4} />
            </div>
            <Modal>
                <p>이곳은 모달 창</p>
                <ul>
                    <li>메시지1</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                    <li>모달</li>
                </ul>
            </Modal>
        </article>
    )
}

export default Home
