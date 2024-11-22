'use server'

import { getAllUrlImage } from "@packages/db/models/image"

export const getUrlImageQuery = async ()=>{

    const images = await getAllUrlImage()
    return images

}
