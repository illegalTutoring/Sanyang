import React, { useEffect, useState } from 'react'
import styles from './gallery.module.scss'
import Gallery from '@/component/Gallery'
import TagInput from '@/component/TagInput'
import Modal from '@/component/layout/Modal'
import GridGallery from '@/component/GridGallery'
import useDarkModeStore from '@/utils/store/useThemaStore'
import { getGalleryList } from '@/utils/api/gallery'
import useEditModeStore from '@/utils/store/useEditModeStore'
import { galleryInfo } from '@/utils/api/DTO/gallery'
import ClientPage from '../gallery/clientPage'

/**
 * @todo Error Handling
 */

const fetchGallery = async () => {
    const response = await getGalleryList()
    return response.data ? response.data : []
}

const GalleryPage: React.FC = async () => {
    const images: galleryInfo[] = (await fetchGallery()) || []
    return <ClientPage images={images}></ClientPage>
}

export default GalleryPage
