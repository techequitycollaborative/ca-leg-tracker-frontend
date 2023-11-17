import { ReactNode } from 'react';
import Header from '@/components/header';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import BillNav from '@/components/bill-nav'

interface Props {
  children?: ReactNode;
}

export default function BillLayout({ children }: Props) {
  return (
    <div>
      <div className='flex border-2 border-black p-4 m-4'>
        <p>bill header (number, title, dashboard, link, session)</p>
      </div>
      <div className='flex border-2 border-black m-4'>
        <div className='w-1/2 p-4 bg-gray-400'>
          <BillNav />
          <div className="border-2 border-black mt-4 p-2">
            {children}
          </div>
        </div>
        <div className='w-1/2 p-4 bg-gray-300'>
          <p>Discussion panel</p>
        </div>
      </div>
    </div>
  );
}