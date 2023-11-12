import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/layouts/default'

import { getBills } from '@/lib/get-bills';

import BillNav from '@/components/bill-nav'
import BillListItem from '@/components/bill-list-item'


export default function Dashboard() {
  return (
    <Layout>
      <div>
        <BillNav />
        <div className="border-2 border-black p-4 m-4">
          <p>bill list</p>
          {getBills(null, null).bills.map(
            (x, i) => (
              <p key={i} className="border-2 border-gray-300 p-2 m-2">{x.number}</p>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

