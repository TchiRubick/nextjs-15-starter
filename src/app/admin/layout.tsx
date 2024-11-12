export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className='mx-auto min-h-screen py-20 container'>{children}</main>;
}
