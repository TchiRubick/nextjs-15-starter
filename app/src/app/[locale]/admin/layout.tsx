import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='mx-auto min-h-screen bg-slate-900/95 py-20 md:p-20'>
      {children} <Toaster />
    </main>
  );
}
