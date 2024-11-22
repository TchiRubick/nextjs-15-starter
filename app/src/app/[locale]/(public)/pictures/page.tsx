import { getUrlImageQuery } from '@/actions/image.action';
import { Gallery } from './_components/gallery';
import { useEffect } from 'react';

const Pictures = async () => {
    
    const images =  await getUrlImageQuery()
    
    return <Gallery images={images} />;
}

export default Pictures;
