import { getUrlImageQuery } from '@/actions/image.action';
import { Gallery } from './_components/gallery';
<<<<<<< HEAD
const Pictures = async () => {
  const images = await getUrlImageQuery();

  return <Gallery images={images} />;
};
=======
import { useEffect } from 'react';

const Pictures = async () => {
    
    const images =  await getUrlImageQuery()
    
    return <Gallery images={images} />;
}
>>>>>>> 5cb7d4e (chore : add getImage)

export default Pictures;
