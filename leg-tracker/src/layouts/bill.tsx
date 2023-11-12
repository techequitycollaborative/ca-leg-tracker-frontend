import { ReactNode } from 'react';
import Header from '@/components/header';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Props {
  children?: ReactNode;
}

export default function BillLayout({ children }: Props) {
  return (
    <div>
      <p>bill header</p>
      <p>left side: content panel</p>
      <p>right side: discussion panel</p>


      
    </div>
  );
}