import getQueryClient from '@/lib/query-client';
import { LangueProvider } from '@/providers/langue-provider';
import { ReactQueryProviders } from '@/providers/react-query-provider';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';
import 'react-multi-date-picker/styles/colors/green.css';
import 'react-multi-date-picker/styles/colors/red.css';
import '../globals.css';
import { Loader } from './(public)/_components/loader';
const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Refuges des Hauts | Location de Chalets dans les Vosges',
  description:
    'Découvrez nos chalets authentiques dans les Vosges. Location de refuges confortables à Bussang, proche des pistes de ski de Larcenaire. Séjour en montagne parfait pour les familles.',
  keywords:
    'location chalet vosges, refuge bussang, hébergement ski vosges, vacances montagne vosges, séjour vosges, france montagne, ski, chalet, vosges, bussang, nature, montagne, vacances, séjour',
  authors: [{ name: 'Refuges des Hauts' }],
  creator: 'Refuges des Hauts',
  metadataBase: new URL('https://nextjs-15-starter-production.up.railway.app'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://nextjs-15-starter-production.up.railway.app',
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
    canonical: 'https://nextjs-15-starter-production.up.railway.app',
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang='fr' suppressHydrationWarning>
      <LangueProvider locale={locale}>
        <ReactQueryProviders>
          <HydrationBoundary state={dehydrate(getQueryClient())}>
            <NuqsAdapter>
              <Suspense fallback={<Loader />}>
                <body
                  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                  {children}
                </body>
              </Suspense>
            </NuqsAdapter>
          </HydrationBoundary>
        </ReactQueryProviders>
      </LangueProvider>
      <Script
        strategy='afterInteractive'
        src='https://cloud.umami.is/script.js'
        data-website-id='39f403e9-434f-4ab6-8c12-5b282455e7d9'
      />
    </html>
  );
}
