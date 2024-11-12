export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='container mx-auto min-h-screen py-20'>{children}</main>
  );
}
