import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  const navigationItems = [
    {
      title: 'A propos',
      href: '/about',
      items: [
        {
          title: "Conditions d'utilisation",
          href: '/terms-of-service',
        },
        {
          title: 'Politique de confidentialité',
          href: '/privacy-policy',
        },
        {
          title: 'Map',
          href: '/map',
        },
      ],
    },
    {
      title: 'Chalets',
      items: [
        {
          title: 'Haute qualité',
          href: '/properties?min_price=200&max_price=500',
        },
        {
          title: 'Special couples',
          href: '/properties?min_price=30&max_price=50',
        },
      ],
    },
    {
      title: 'Company',
      items: [
        {
          title: 'About us',
          href: '/about',
        },
        {
          title: 'Fundraising',
          href: '/fundraising',
        },
        {
          title: 'Investors',
          href: '/investors',
        },
        {
          title: 'Contact us',
          href: '/contact',
        },
      ],
    },
  ];

  return (
    <div className='w-full bg-emerald-950 px-4 py-20 text-background lg:py-40'>
      <div className='container mx-auto'>
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <div className='flex flex-col items-start gap-8'>
            <div className='flex flex-col gap-2'>
              <h2 className='font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl'>
                <Image src='/logo.svg' alt='logo' width={400} height={400} />
              </h2>
              <p className='max-w-lg text-left text-lg leading-relaxed tracking-tight text-background/75'>
                La destination de refuges confortables à Bussang, proche des
                pistes de ski de Larcenaire.
              </p>
            </div>
            <div className='flex flex-row gap-20'>
              <div className='flex max-w-lg flex-col text-left text-sm leading-relaxed tracking-tight text-background/75'>
                <p>Rue des Balcons de Bussang</p>
                <p>88540 Bussang</p>
                <p className='flex items-center gap-1'>
                  <Image
                    src='/flags/fr.svg'
                    className='h-4 w-4'
                    alt='fr'
                    width={8}
                    height={8}
                  />{' '}
                  France
                </p>
              </div>
              <div className='flex max-w-lg flex-col text-left text-sm leading-relaxed tracking-tight text-background/75'>
                <p>+33 6 00 00 00 00</p>
                <p>info@refugesdeshauts.fr</p>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 items-start gap-10 md:grid-cols-3'>
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className='flex flex-col items-start gap-1 text-base'
              >
                <div className='flex flex-col gap-2'>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className='flex items-center justify-between'
                    >
                      <span className='text-xl'>{item.title}</span>
                    </Link>
                  ) : (
                    <p className='text-xl'>{item.title}</p>
                  )}
                  {item.items &&
                    item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className='flex items-center justify-between'
                      >
                        <span className='text-background/75'>
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
