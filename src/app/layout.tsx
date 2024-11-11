import { ReactQueryProviders } from '@/providers/react-query-provider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';
import { Loader } from './(public)/_components/loader';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Refuges des Hauts | Location de Chalets dans les Vosges',
  description:
    'Découvrez nos chalets authentiques dans les Vosges. Location de refuges confortables à Bussang, proche des pistes de ski de Larcenaire. Séjour en montagne parfait pour les familles.',
  keywords:
    'refuge vosges, location chalet bussang, hébergement montagne vosges, ski larcenaire, vacances montagne',
  authors: [{ name: 'Refuges des Hauts' }],
  creator: 'Refuges des Hauts',
  metadataBase: new URL('https://refugesdeshauts.fr'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://refugesdeshauts.fr',
    title: 'Refuges des Hauts | Location de Chalets dans les Vosges',
    description:
      'Découvrez nos chalets authentiques dans les Vosges. Location de refuges confortables à Bussang, proche des pistes de ski de Larcenaire.',
    siteName: 'Refuges des Hauts',
    images: [
      {
        url: '/275327112.jpg',
        width: 1200,
        height: 630,
        alt: 'Refuges des Hauts - Chalets dans les Vosges',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refuges des Hauts | Location de Chalets dans les Vosges',
    description:
      'Découvrez nos chalets authentiques dans les Vosges. Location de refuges confortables à Bussang.',
    images: ['/275327112.jpg'],
  },
  alternates: {
    canonical: 'https://refugesdeshauts.fr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr'>
      <ReactQueryProviders>
        <Suspense fallback={<Loader />}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <NuqsAdapter>{children}</NuqsAdapter>
          </body>
        </Suspense>
      </ReactQueryProviders>
    </html>
  );
}
