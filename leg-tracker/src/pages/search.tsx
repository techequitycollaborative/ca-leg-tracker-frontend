import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/layouts/default'

import ListSearchBar from '@/components/list-search-bar'
import ListNav from '@/components/list-nav'
import ListItem from '@/components/list-item'

import { IBillRepository } from "@/definitions/bill.repository"
import { repositories } from "@/repositories/index"

export default function Search({ data }: any) {
  return (
    <Layout>
      <div>
        <ListSearchBar />
        <ListNav />
        <div className="border-2 border-black p-4 m-4">
          <p>bill list</p>
          {data && data.map(
            (x: any, i: any) => (
              <div key={i}>
                <ListItem
                  billId={x.billId}
                  billNumber={x.billNumber}
                  billName={x.billName}
                />
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const bills = await repositories.billRepository.list({limit:20}) as IBillRepository[] | null;
  return {
    props: {
      data: bills,
    },
  };
}