import { ReactNode } from 'react';
import Header from '@/components/header';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Navbar />
      <main className="w-full bg-gray-200 p-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
