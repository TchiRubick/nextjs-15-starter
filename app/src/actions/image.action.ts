<<<<<<< HEAD
'use server';

import { getAllUrlImage } from '@packages/db/models/image';

export const getUrlImageQuery = async () => {
  const images = await getAllUrlImage();
  return images;
};
=======
'use server'

import { getAllUrlImage } from "@packages/db/models/image"

export const getUrlImageQuery = async ()=>{

    const images = await getAllUrlImage()
    return images

}
>>>>>>> 5cb7d4e (chore : add getImage)
