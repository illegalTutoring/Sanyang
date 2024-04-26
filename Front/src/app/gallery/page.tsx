'use client'

import React, { useState } from 'react'
import styles from './gallery.module.scss'
import Gallery from '@/component/Gallery'
import TagInput from '@/component/TagInput'
import Modal from '@/component/Modal'
import { useDarkModeStore } from '@/utils/store/useThemaStore'

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

    const { darkMode } = useDarkModeStore()

    return (
        <article
            className={`${styles.container} ${darkMode ? 'dark' : 'light'}`}
        >
            <div className={styles.galleryWrapper}>
                <Gallery
                    images={defaultImages2}
                    width={'80%'}
                    height={'300px'}
                    colCount={4}
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
