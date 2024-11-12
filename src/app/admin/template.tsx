import { Header } from './_components/header';

export const unstable_noStore = true;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
