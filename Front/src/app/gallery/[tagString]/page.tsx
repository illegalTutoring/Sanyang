import React from 'react'
import { getGalleryListByTag } from '@/utils/api/gallery'
import { galleryInfo } from '@/utils/api/DTO/gallery'
import ClientPage from '../clientPage'

/**
 * @todo Error Handling
 */

const fetchGalleryByTag = async (tags: string[]) => {
    const response = await getGalleryListByTag(tags)
    return response.data || []
}

const GalleryPage = async ({ params }: { params: { tagString: string } }) => {
    let images: galleryInfo[] = []
    let tags: string[] = []
    console.log(params.tagString)

    tags = params.tagString.toString().split(',')
    images = (await fetchGalleryByTag(tags)) || []

    return <ClientPage propsImages={images}></ClientPage>
}

export default GalleryPage
