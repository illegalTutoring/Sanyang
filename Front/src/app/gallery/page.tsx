'use client'

import React, { useState } from 'react'
import Gallery from '@/component/Gallery'
import styles from './gallery.module.scss'

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

    return (
        <div className={styles.container}>
            <div className={styles.galleryWrapper}>
                <Gallery
                    images={defaultImages2}
                    width={'80%'}
                    height={'300px'}
                    colCount={4}
                />
            </div>
            <div>
                <input type="" />
                <input type="" />
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

export default Home
