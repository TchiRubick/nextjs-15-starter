import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es',
          en: 'https://nextjs-15-starter-production.up.railway.app/en',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr',
        },
      },
    },
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/about',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es/about',
          en: 'https://nextjs-15-starter-production.up.railway.app/en/about',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr/about',
        },
      },
    },
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/auth',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es/auth',
          en: 'https://nextjs-15-starter-production.up.railway.app/en/auth',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr/auth',
        },
      },
    },
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/signup',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es/signup',
          en: 'https://nextjs-15-starter-production.up.railway.app/en/signup',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr/signup',
        },
      },
    },
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/contact',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es/contact',
          en: 'https://nextjs-15-starter-production.up.railway.app/en/contact',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr/contact',
        },
      },
    },
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/forgotpassword',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es/forgotpassword',
          en: 'https://nextjs-15-starter-production.up.railway.app/en/forgotpassword',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr/forgotpassword',
        },
      },
    },
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/pictures',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es/pictures',
          en: 'https://nextjs-15-starter-production.up.railway.app/en/pictures',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr/pictures',
        },
      },
    },
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/privacy-policy',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es/privacy-policy',
          en: 'https://nextjs-15-starter-production.up.railway.app/en/privacy-policy',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr/privacy-policy',
        },
      },
    },
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/privacy-policy',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es/privacy-policy',
          en: 'https://nextjs-15-starter-production.up.railway.app/en/privacy-policy',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr/privacy-policy',
        },
      },
    },
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/properties',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es/properties',
          en: 'https://nextjs-15-starter-production.up.railway.app/en/properties',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr/properties',
        },
      },
    },
    {
      url: 'https://nextjs-15-starter-production.up.railway.app/terms-of-service',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://nextjs-15-starter-production.up.railway.app/es/terms-of-service',
          en: 'https://nextjs-15-starter-production.up.railway.app/en/terms-of-service',
          fr: 'https://nextjs-15-starter-production.up.railway.app/fr/terms-of-service',
        },
      },
    },
  ];
}
