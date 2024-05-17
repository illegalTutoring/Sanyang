import React from 'react'
import { getGalleryList } from '@/utils/api/gallery'
import { galleryInfo } from '@/utils/api/DTO/gallery'
import ClientPage from './clientPage'

/**
 * @todo Error Handling
 */

const fetchGallery = async () => {
    const response = await getGalleryList()
    return response.data || []
}

const GalleryPage = async () => {
    let images: galleryInfo[] = await fetchGallery()

    return <ClientPage propsImages={images}></ClientPage>
}

export default GalleryPage
