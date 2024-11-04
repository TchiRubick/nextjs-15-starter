import Image from 'next/image';
const images = [
  '/gallery/p.jpg',
  '/gallery/p1.jpg',
  '/gallery/p2.jpg',
  '/gallery/p3.jpg',
  '/gallery/p4.jpg',
  '/gallery/p5.jpg',
  '/gallery/p6.jpg',
  '/gallery/p7.jpg',
  '/gallery/p8.jpg',
  '/gallery/p9.jpg',
];
const Pictures = () => {
  return (
    <div className='m-auto w-5/6 columns-3 gap-2'>
      {images.map((image) => (
        <div className='py-2' key={image}>
          <Image
            src={image}
            alt='Picture of the author'
            className='hover:cursor-pointer hover:shadow-md hover:shadow-slate-600'
            width={500}
            height={500}
          />
        </div>
      ))}
    </div>
  );
};

export default Pictures;
